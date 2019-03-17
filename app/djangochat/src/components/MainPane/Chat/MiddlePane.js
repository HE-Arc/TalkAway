import React, {Component} from 'react';
import {connect} from 'react-redux';

import MessageComponent from './Message/Message';

import {baseWebsocketUrl} from '../../../config/config.js';
import {addMessage} from "../../../actions/MessageAction";

class MiddlePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageComponentList : [],
            messageInput:''
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div>
                <div id="messages">
                    {this.props.messages.map(message=>{
                        return <MessageComponent messageObject={message} key={message.id}></MessageComponent>
                    })}
                    {this.state.messageComponentList}
                </div>
                <input onChange={this.handleChange} onKeyPress={this.handleKeyPress} autoFocus value={this.state.messageInput} ref={(input) => this.handleChange} type="text"/><button onClick={this.sendMessage} >Send</button>
            </div>
        );
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.sendMessage();
        }
    }

    handleChange = (event) => {
        this.setState({messageInput: event.target.value});
    }

    sendMessage = () => {
        var message = this.state.messageInput;
        let now=new Date();
        this.chatSocket.send(JSON.stringify({
            id_message3: {
                user: this.props.user,
                text: message,
                date: Date.now()
            }
        }));

        this.setState({messageInput: ''});
    }

    componentDidMount(){
        let roomName="test";

        this.chatSocket = new WebSocket(
            baseWebsocketUrl+'/'+ roomName+'/');
        
        this.chatSocket.onmessage = function(e) {
            var message = JSON.parse(e.data).message;
            this.props.addMessage(message);
        };
        this.chatSocket.onmessage = this.chatSocket.onmessage.bind(this);

        this.chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };
    }
}

const mapsStateToProps = (state) => {
    return {
        messages: state.message.messages,
        user: {
            username: state.auth.username,
            id: state.auth.id
        }
    }
}

export default connect(mapsStateToProps, {addMessage})(MiddlePane); 
