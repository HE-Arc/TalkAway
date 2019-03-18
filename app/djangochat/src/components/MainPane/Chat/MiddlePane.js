import React, {
    Component
} from 'react';
import MessageComponent from './Message/Message';
import ChatInput from './ChatInput/ChatInput';
import './MiddlePane.css';

class MiddlePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageList: props.messageList,
            messageComponentList : [],
            messageInput:'',
            chatInputHeight: 50
        };

        this.handleChange = this.handleChange.bind(this);
        this.adaptMessagesSpace = this.adaptMessagesSpace.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        Object.keys(this.state.messageList).forEach(key => {
            this.state.messageComponentList.push(React.createElement(MessageComponent, {
                'messageObject': this.state.messageList[key],
                'key': key
            }));
        });
    }

    adaptMessagesSpace() {
        const height = document.getElementById('inputMessage').clientHeight;
        this.setState({
            chatInputHeight: height + 19
        })
    }

    render() {
        return (
            <div id="messagesContainer">
                <div style={{height: window.innerHeight - this.state.chatInputHeight}} id="messages">
                    {this.state.messageComponentList}
                </div>
                <div style={{height: this.state.chatInputHeight}} id="chatInput">
                    <ChatInput sendMessage={this.sendMessage} adaptMessagesSpace={this.adaptMessagesSpace}/>
                </div>
            </div>
        );
    }

    handleChange(event) {
        this.setState({messageInput: event.target.value});
    }

    sendMessage(message) {
        this.chatSocket.send(JSON.stringify({
            id_message3: {
                user: {
                    username: "Yves"
                },
                text: message,
                date: "04:20"
            }
        }));

        this.setState({messageInput: ''});
    }

    componentDidMount(){
        let roomName="test"; //TODO: CHANGE THIS

        this.chatSocket = new WebSocket(
            'ws://' + window.location.host.split(":")[0] +
            ':8080/ws/djangochat/' + roomName + '/');
        
        this.chatSocket.onmessage = function(e) {
            var message = JSON.parse(e.data).message;
            let keyCount=this.state.messageComponentList.length;
            this.state.messageComponentList.push(React.createElement(MessageComponent,{
                'messageObject': message,
            'key':keyCount})); //TODO: check if it's correct how i'm passing the message attribute
            this.forceUpdate();
        };
        this.chatSocket.onmessage = this.chatSocket.onmessage.bind(this);

        this.chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

    }
}

export default MiddlePane;