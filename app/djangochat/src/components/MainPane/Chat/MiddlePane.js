import React, {Component} from 'react';
import {connect} from 'react-redux';

import MessageComponent from './Message/Message';
import ChatInput from './ChatInput/ChatInput';
import './MiddlePane.css';

import {baseWebsocketUrl} from '../../../config/config.js';
import {addMessage} from "../../../actions/MessageAction";

class MiddlePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageInput:'',
            chatInputHeight: 50,
            scrolling: false,
            messageSent: false,
            lastChannelId:0
        };

        this.handleChange = this.handleChange.bind(this);
        this.scroll = this.scroll.bind(this);


        // Messages scrollbar policy
        document.body.addEventListener('DOMSubtreeModified', this.DOMModified, false);
    }

    DOMModified = () => {
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

    adaptMessagesSpace = () => {
        const height = document.getElementById('inputMessage').clientHeight;
        this.setState({
            chatInputHeight: height + 19
        })
    }

    dropDown = () => {
        let element = document.getElementById("messages");
        if (element != null) {
            element.scrollTop = element.scrollHeight;
        }
    }

    render() {
        const messagesAvailable = this.props.messages.length > 0;
        
        let dropDownVisibility = {bottom: this.state.chatInputHeight + 10};
        if (!this.state.scrolling) {
            dropDownVisibility = {display: 'none', bottom: this.state.chatInputHeight + 10};
        }

        return (
            <div id="messagesContainer">
                {messagesAvailable ?
                    <section id="messages" onScroll={this.scroll} style={{height: window.innerHeight - this.state.chatInputHeight}}>
                        {
                            this.props.messages.map(message=>{
                                return <MessageComponent messageObject={message} key={message.id}></MessageComponent>
                            })
                        }
                    </section>
                :
                    <div id="noMessages">
                        <div id="noMessageContainer">
                            <img id="noMessageImage" alt="" src={require('./images/noMessage.png')} width="120" height="120"/>
                        </div>
                    </div>
                }
                {
                this.props.channelId!==0 ?
                <div style={{height: this.state.chatInputHeight}} id="chatInput">
                    <ChatInput sendMessage={this.sendMessage} adaptMessagesSpace={this.adaptMessagesSpace}/>
                </div>
                :
                <div>
                    Please select a channel
                </div>
                }
                <button id="dropdown" style={dropDownVisibility} onClick={this.dropDown}>
                    Derniers messages
                </button>
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

    handleChange(event) {
        this.setState({messageInput: event.target.value});
    }

    sendMessage = () => {
        let message = this.state.messageInput;
        this.chatSocket.send(JSON.stringify({
            id_message: {
                text : message,
                channel : this.props.channelId,
                user : this.props.user.id,
                token : this.props.user.token
            }
        }));

        this.setState({
            messageInput: '',
            messageSent: true
        });
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
            id: state.auth.id,
            token : state.auth.token
        },
        channelId:state.channel.activeChannelId
    }
}

export default connect(mapsStateToProps, {addMessage})(MiddlePane); 
