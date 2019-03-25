from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from . import schema
import graphene
from .models import Message
from django.core.serializers.json import DjangoJSONEncoder


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['channel_id']
        
        self.room_group_name = 'chat_%s' % self.room_name
        print(self.scope["user"])
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
                    }
                }
            })

    # Receive message from room group

    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
