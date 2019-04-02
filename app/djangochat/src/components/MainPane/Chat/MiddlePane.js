import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import MessageComponent from './Message/Message';
import ChatInput from './ChatInput/ChatInput';
import './MiddlePane.css';

import { addMessage, requestSendMessage } from "../../../actions/MessageAction";
import { connectChannel } from "../../../actions/WebSocketAction";

class MiddlePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageInput: '',
            chatInputHeight: 50,
            scrolling: false,
            messageSent: false,
            lastChannelId: 0,
            messageReceived: false,
            wsConnected: false,
            messageEventListenerAdded:false
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
        if (element) {
            this.setState({
                scrolling: Math.round(element.scrollHeight - element.scrollTop) > element.clientHeight,
                messageReceived: false
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
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    }

    componentDidUpdate() {

        if (this.props.ws != null && this.props.ws.readyState === WebSocket.OPEN && Number(this.props.channelId) !== 0 &&
            (!this.state.wsConnected || Number(this.state.lastChannelId) !== Number(this.props.channelId))) {
            this.setState({ lastChannelId: this.props.channelId });
            this.props.connectChannel(this.props.channelId);
            this.dropDown();
            if(!this.state.messageEventListenerAdded){
                this.props.ws.addEventListener('displayMessage',messageData => {   
                    
                        let message=messageData.detail; 
                        if(Number(message.channel_id)===Number(this.props.channelId)){
                            this.props.addMessage(message);
                            
                            this.setState({
                                messageReceived: true,
                                messageEventListenerAdded: true
                            });
                        } 
                });
                this.setState({ messageEventListenerAdded: true});
            }
            this.setState({
                wsConnected: true
            });
            
        }
    }

    handleChange(event) {
        this.setState({ messageInput: event.target.value });
    }

    sendMessage = (text) => {
        this.props
            .requestSendMessage(text, this.props.channelId)
            .then(resData => {
                const messageId = resData.data.createMessage.id;

                this.props.ws.send(JSON.stringify({
                    newMessage: {
                        id: messageId
                    }
                }));

                this.setState({
                    messageInput: '',
                    messageSent: true
                });
            }).catch((err) => {
                toastr.error("Error", "Impossible to send your message :'(")
            });
    }

    render() {
        const messagesAvailable = this.props.messages.length > 0;

        let dropDownVisibility = { bottom: this.state.chatInputHeight + 10 };
        if (!this.state.scrolling && !this.state.messageReceived) {
            dropDownVisibility = { display: 'none', bottom: this.state.chatInputHeight + 10 };
        }

        return (
            <div id="messagesContainer">
                {messagesAvailable ?
                    <section id="messages" onScroll={this.scroll} style={{ height: window.innerHeight - this.state.chatInputHeight }}>
                        {
                            this.props.messages.map(message => {
                                return <MessageComponent
                                    auth={this.props.auth}
                                    images={this.props.images}
                                    messageObject={message}
                                    key={message.id}></MessageComponent>
                            })
                        }
                    </section>
                    :
                    <div id="noMessages">
                        <div id="noMessageContainer">
                            <img id="noMessageImage" alt="" src={require('./images/noMessage.png')} width="120" height="120" />
                        </div>
                    </div>
                }
                {
                    this.props.channelId > 0 ?
                        <div style={{ height: this.state.chatInputHeight }} id="chatInput">
                            <ChatInput sendMessage={this.sendMessage} adaptMessagesSpace={this.adaptMessagesSpace} />
                        </div>
                        :
                        <div>
                            Please select a channel
                </div>
                }
                <button id="dropdown" style={dropDownVisibility} onClick={this.dropDown}>
                    View last messages
                </button>
            </div>
        );

    }
}

const mapsStateToProps = (state) => {
    return {
        messages: state.message.messages,
        user: {
            username: state.auth.username,
            id: state.auth.id,
            token: state.auth.token
        },
        channelId: state.channel.activeChannelId,
        serverId: state.server.activeServerId,
        server: state.server.servers.filter(s=>s.id === state.server.activeServerId),
        ws: state.ws.ws,
        images: state.contact.images,
        auth: state.auth
    }
}

export default connect(mapsStateToProps, { addMessage, requestSendMessage, connectChannel })(MiddlePane); 
