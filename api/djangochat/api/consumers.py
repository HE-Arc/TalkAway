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

    def receive(self, text_data):
        text_data_json = json.loads(text_data)

        try:
            new_channel_id = text_data_json['connectChannel']['id']
            self.channel = Channel.objects.get(id=new_channel_id)
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
        except:
            pass

        try:
            messageId = text_data_json['newMessage']['id']

            message = Message.objects.get(id=messageId)

            if self.channel.direct_type:
                if self.friend.user_one.id == self.user.id:
                    friend_id = self.friend.user_two.id
                    friendName = self.friend.user_two.username
                else:
                    friend_id = self.friend.user_one.id
                    friendName = self.friend.user_one.username

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
                            'direct_type': True,
                            'friend_name': friendName
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
                            'direct_type': False,
                            'channel_name':message.channel.name,
                            'server_name':self.server.name
                        }
                    })
        except:
            pass

    # Receive message from room group

    def chat_message(self, event):
        if self.channel != 0:
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
