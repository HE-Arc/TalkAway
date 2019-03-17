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
            messageInput:'',
            lastChannelId:0
        };

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
                {this.props.channelId!==0?
                <div><input onChange={this.handleChange} onKeyPress={this.handleKeyPress} autoFocus value={this.state.messageInput} ref={(input) => this.handleChange} type="text"/><button onClick={this.sendMessage} >Send</button></div>
                :<div>Choose a channel</div>}
            </div>
        );
        
    }

    componentDidUpdate(){
        if(this.state.lastChannelId !== this.props.channelId )
        {
            this.connectWebsocket();
            this.setState({lastChannelId:this.props.channelId});
        }
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
        console.log(this.props.user)
        this.chatSocket.send(JSON.stringify({
            id_message: {
                text: message,
                channel:this.props.channelId
            }
        }));

        this.setState({messageInput: ''});
    }

    connectWebsocket = () => {

        //If we select a new channel and a previous WebSocket instance already exists
        if(this.chatSocket instanceof WebSocket)
        {
            this.chatSocket.close();
        }

        this.chatSocket = new WebSocket(
            baseWebsocketUrl+'/'+ this.props.channelId+'/');
        
        this.chatSocket.onmessage = function(e) {
            var message = JSON.parse(e.data).message;
            this.props.addMessage(message);
        };
        this.chatSocket.onmessage = this.chatSocket.onmessage.bind(this);

        // this.chatSocket.onclose = function(e) {
        //     console.error('Chat socket closed unexpectedly');
        // };
    }
}

const mapsStateToProps = (state) => {
    return {
        messages: state.message.messages,
        user: {
            username: state.auth.username,
            id: state.auth.id
        },
        channelId:state.channel.activeChannelId
    }
}

export default connect(mapsStateToProps, {addMessage})(MiddlePane); 
