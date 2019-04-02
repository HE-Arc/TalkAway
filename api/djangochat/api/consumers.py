from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from . import schema
import graphene
from .models import Message, User, Channel, Friend
from django.core.serializers.json import DjangoJSONEncoder
from graphql_jwt.utils import jwt_decode


class ChatConsumer(WebsocketConsumer):
    def connect(self):

        self.user = self.scope['user']
        self.channel = 0

        self.subscribedServers = self.user.servers.all()

        self.room_name = self.user.username
        self.room_group_name = "all"

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def handle_notification(self, notification):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'notification': notification
            })

    def handle_action(self, action):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'action': action
            })

    def handle_channel_change(self, new_channel_id):
        self.channel = Channel.objects.get(id=new_channel_id)
        if self.channel.direct_type:
            self.friend = Friend.objects.get(chanel=self.channel)
            if self.friend.user_one != self.user and self.friend.user_two != self.user:
                raise Exception(
                    "Authentication error, the user isn't a friend with the user he's trying to send a message to")
        else:
            self.server = self.channel.server

            if self.server not in self.subscribedServers:
                raise Exception(
                    "Authentication error, the user isn't allowed to join this channel")

    def handle_new_message(self, message_id):
        message = Message.objects.get(id=message_id)

        if self.channel.direct_type:
            if self.friend.user_one.id == self.user.id:
                friend_id = self.friend.user_two.id
            else:
                friend_id = self.friend.user_one.id

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': {
                        'id': message_id,
                        'text': message.text,
                        'date': json.dumps(message.date, cls=DjangoJSONEncoder),
                        'user': {
                            'username': message.user.username,
                            'id': self.user.id
                        },
                        'channel_id': message.channel.id,
                        'friend_id': friend_id,
                        'my_id': self.user.id,
                        'direct_type': True,
                        'friend_name': self.user.username
                    }
                })

        else:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': {
                        'id': message_id,
                        'text': message.text,
                        'date': json.dumps(message.date, cls=DjangoJSONEncoder),
                        'user': {
                            'username': message.user.username,
                            'id': self.user.id
                        },
                        'channel_id': message.channel.id,
                        'server_id': self.server.id,
                        'direct_type': False,
                        'channel_name': message.channel.name,
                        'server_name': self.server.name
                    }
                })

    def receive(self, text_data):
        text_data_json = json.loads(text_data)

        try:
            self.handle_action(text_data_json['action'])
        except:
            pass

        try:
            self.handle_notification(text_data_json['notification'])
        except:
            pass

        try:
            self.handle_channel_change(text_data_json['connectChannel']['id'])
        except:
            pass

        try:
            self.handle_new_message(text_data_json['newMessage']['id'])
        except:
            pass

    def chat_message(self, event):

        try:
            message = event['message']
            if self.channel != 0:
                if message['direct_type']:
                    if message['friend_id'] == self.user.id or message['my_id'] == self.user.id:
                        self.send(text_data=json.dumps({
                            'message': message
                        }))
                else:
                    for server in self.subscribedServers:
                        if server.id == message['server_id']:
                            self.send(text_data=json.dumps({
                                'message': message
                            }))
                            break
        except Exception as e:
            pass

        try:
            notification = event['notification']
            if self.user.id == int(notification['user_id']):
                self.send(text_data=json.dumps({
                    'notification': notification
                }))
                if notification.type == "server":
                    self.subscribedServers = self.user.servers.all()
        except Exception as e:
            pass

        try:
            action = event['action']
            if self.server.id == int(action['server_id']) and self.user.id != int(action['my_id']):
                self.send(text_data=json.dumps({
                    'action': action
                }))
        except Exception as e:
            pass
