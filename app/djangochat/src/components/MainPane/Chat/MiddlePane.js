import React, {
    Component
} from 'react';
import MessageComponent from './Message/Message';

class MiddlePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageList: props.messageList,
            messageComponentList : [],
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);


    }

    render() {

        Object.keys(this.state.messageList).forEach(key => {
            this.state.messageComponentList.push(React.createElement(MessageComponent, {
                'messageObject': this.state.messageList[key],
                'key': key
            }));
        });

        return (
            <div>
                <div id="messages">
                    {this.state.messageComponentList}
                </div>
                <input onKeyPress={this.handleKeyPress} autoFocus value={this.messageInput} ref={(input) => this.messageInput = input} type="text"/><button onClick={this.sendMessage} >Send</button>
            </div>
        );
    }

    handleKeyPress(event){
        if(event.key === 'Enter'){
            this.sendMessage();
        }
    }

    sendMessage(){
        var message = this.messageInput.value;
        this.chatSocket.send(JSON.stringify({
            id_message3: {
                user: {
                    username: "Yves"
                },
                text: message,
                date: "04:20"
            }
        }));

        this.messageInput.value = '';
    }

    componentDidMount(){
        let roomName="test"; //TODO: CHANGE THIS

        this.chatSocket = new WebSocket(
            'ws://' + window.location.host +
            '/ws/chat/' + roomName + '/');

        this.chatSocket.onmessage = function(e) {
            var message = JSON.parse(e.data);
            this.state.messageComponentList.push(React.createElement(MessageComponent,message)); //TODO: check if it's correct how i'm passing the message attribute
        };

        this.chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

    }
}

export default MiddlePane;