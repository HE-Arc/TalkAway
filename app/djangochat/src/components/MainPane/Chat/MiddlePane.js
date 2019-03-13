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
            messageInput:''
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);

        Object.keys(this.state.messageList).forEach(key => {
            this.state.messageComponentList.push(React.createElement(MessageComponent, {
                'messageObject': this.state.messageList[key],
                'key': key
            }));
        });


    }

    

    render() {

    
        return (
            <div>
                <div id="messages">
                    {this.state.messageComponentList}
                </div>
                <input onChange={this.handleChange} onKeyPress={this.handleKeyPress} autoFocus value={this.state.messageInput} ref={(input) => this.handleChange} type="text"/><button onClick={this.sendMessage} >Send</button>
            </div>
        );
    }

    handleKeyPress(event){
        if(event.key === 'Enter'){
            this.sendMessage();
        }
    }

    handleChange(event) {
        this.setState({messageInput: event.target.value});
    }

    sendMessage(){
        var message = this.state.messageInput;
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
            var message = JSON.parse(e.data);
            console.log(message)
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