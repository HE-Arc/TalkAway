from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from . import schema
import graphene
from .models import Message, User, Channel
from django.core.serializers.json import DjangoJSONEncoder
from graphql_jwt.utils import jwt_decode


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        channel_id = int(self.scope['url_route']['kwargs']['channel_id'])

        user = self.scope['user']

        channel = Channel.objects.get(id=channel_id)
        self.server = channel.server

        self.subscribedServers = user.servers.all()

        authServer = False

        for subscribedServer in self.subscribedServers:
            if subscribedServer == self.server:
                authServer = True

        if not authServer:
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
        # print(self.room_name)
        # print(self.room_group_name)
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
                    'server_id': self.server.id
                }
            })

    # Receive message from room group

    def chat_message(self, event):
        message = event['message']

        for server in self.subscribedServers:
            if server.id == message['server_id']:
                self.send(text_data=json.dumps({
                    'message': message
                }))
                break
