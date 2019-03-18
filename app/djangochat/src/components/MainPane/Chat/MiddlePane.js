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
            messageComponentList: [],
            messageInput: '',
            chatInputHeight: 50,
            scrolling: false,
            messageSent: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.adaptMessagesSpace = this.adaptMessagesSpace.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.DOMModified = this.DOMModified.bind(this);
        this.scroll = this.scroll.bind(this);
        this.dropDown = this.dropDown.bind(this);

        Object.keys(this.state.messageList).forEach(key => {
            this.state.messageComponentList.push(React.createElement(MessageComponent, {
                'messageObject': this.state.messageList[key],
                'key': key,
            }));
        });

        // Messages scrollbar policy
        document.body.addEventListener('DOMSubtreeModified', this.DOMModified, false);
    }

    DOMModified() {
        if (this.state.messageSent) {
            let element = document.getElementById("messages");
            if (element != null) {
                element.scrollTop = element.scrollHeight;
            }

            this.setState({
                messageSent: false
            });
        }
    }

    scroll(event) {
        const element = event.target;
        if (element != null)
        {
            this.setState({
                scrolling: Math.round(element.scrollHeight - element.scrollTop) > element.clientHeight
            })
        }
    }

    adaptMessagesSpace() {
        const height = document.getElementById('inputMessage').clientHeight;
        this.setState({
            chatInputHeight: height + 19
        })
    }

    dropDown() {
        let element = document.getElementById("messages");
        if (element != null) {
            element.scrollTop = element.scrollHeight;
        }
    }

    render() {
        let dropDownVisibility = {bottom: this.state.chatInputHeight + 10};
        if (!this.state.scrolling) {
            dropDownVisibility = {display: 'none', bottom: this.state.chatInputHeight + 10};
        }

        return (
            <div id="messagesContainer">
                <section onScroll={this.scroll} style={{height: window.innerHeight - this.state.chatInputHeight}} id="messages">
                    {this.state.messageComponentList}
                </section>
                <div style={{height: this.state.chatInputHeight}} id="chatInput">
                    <ChatInput sendMessage={this.sendMessage} adaptMessagesSpace={this.adaptMessagesSpace}/>
                </div>
                <button id="dropdown" style={dropDownVisibility} onClick={this.dropDown}>
                    Derniers messages
                </button>
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

        this.setState({
            messageInput: '',
            messageSent: true
        });
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