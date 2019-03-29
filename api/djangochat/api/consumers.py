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
        channel_id = int(self.scope['url_route']['kwargs']['channel_id'])

        self.user = self.scope['user']

        self.channel = Channel.objects.get(id=channel_id)

        if self.channel.direct_type:
            self.friend = Friend.objects.get(chanel=self.channel)
            if self.friend.user_one != self.user and self.friend.user_two != self.user:
               raise Exception(
                "Authentication error, the user isn't a friend with the user he's trying to send a message to")
        else:
            self.server = self.channel.server

            self.subscribedServers = self.user.servers.all()

            if self.server not in self.subscribedServers:
                raise Exception(
                "Authentication error, the user isn't allowed to join this channel")


        self.room_name = channel_id
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

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        messageId = text_data_json['newMessage']['id']
        
        message = Message.objects.get(id=messageId)
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
                        'id': messageId,
                        'text': message.text,
                        'date': json.dumps(message.date, cls=DjangoJSONEncoder),
                        'user': {
                            'username': message.user.username
                        },
                        'channel_id': message.channel.id,
                        'friend_id': friend_id,
                        'my_id': self.user.id,
                        'direct_type': True
                    }
                })

        else:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': {
                        'id': messageId,
                        'text': message.text,
                        'date': json.dumps(message.date, cls=DjangoJSONEncoder),
                        'user': {
                            'username': message.user.username
                        },
                        'channel_id': message.channel.id,
                        'server_id': self.server.id,
                        'direct_type': False
                    }
                })

    # Receive message from room group

    def chat_message(self, event):
        message = event['message']

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
