from channels.generic.websocket import WebsocketConsumer
import json


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        messageJson = text_data_json[list(text_data_json.keys())[0]]
        text = messageJson['text']
        date = messageJson['date']
        username = messageJson['user']['username']

        self.send(text_data=json.dumps({
            'text': text,
            'date': date,
            'user': {
                'username': username
            }
        }))
