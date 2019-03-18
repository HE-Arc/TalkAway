from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from . import schema
import graphene


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

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
        messageJson = text_data_json[list(text_data_json.keys())[0]]
        text = messageJson['text']
        channel = messageJson['channel']
        token = messageJson['token']

        # TODO Insert into database

        # query = """mutation{
        #     createMessage(text:{0}, userId:{1}, channelId:{2}){
        #         id,
        #         date
        #     }
        # }""".format(text, user, channel)
        
        print(token)

        result = graphene.Schema(query=schema.Query, mutation=schema.Mutation).execute(
            '''mutation($text: String!, $channel:Int!, $token:String!) {
                createMessage(text: $text, channelId: $channel, token: $token) {
                    id,
                    date,
                    text
                }
            }''',
            variables={'text': text, 'channel': channel, 'token':token})

        print(result.errors)

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': {
                    'text': text,
                    'date': date,
                    'user': {
                        'username': username
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
