import React, {Component} from 'react';
import {connect} from 'react-redux';

import MessageComponent from './Message/Message';
import ChatInput from './ChatInput/ChatInput';
import './MiddlePane.css';

import {baseWebsocketUrl,baseGraphqlUrl} from '../../../config/config.js';
import {addMessage} from "../../../actions/MessageAction";

import {notifyNewMessage} from "../../../actions/ChannelAction";

class MiddlePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageInput:'',
            chatInputHeight: 50,
            scrolling: false,
            messageSent: false,
            lastChannelId:0,
            messageReceived:false
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
                scrolling: Math.round(element.scrollHeight - element.scrollTop) > element.clientHeight,
                messageReceived:false
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

    notifyNewMessage = (channel_id) => {

    }

    componentDidUpdate(){
        if(this.state.lastChannelId !== this.props.channelId )
        {
            this.connectWebsocket();
            this.setState({lastChannelId:this.props.channelId});
            this.dropDown();
        }
    }

    handleChange(event) {
        this.setState({messageInput: event.target.value});
    }


    sendMessage = (text) => {

        const requestBody = {
            query: `
            mutation {
                createMessage(text: "${text}", channelId: ${this.props.channelId}) {
                    id
                }
            }
            `
        };
        fetch(baseGraphqlUrl+'/', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT '+this.props.user.token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        }).then(resData => {
            const messageId = resData.data.createMessage.id;

            this.chatSocket.send(JSON.stringify({
                newMessage: {
                    id:messageId
                }
            }));

        }).catch(err => {
            console.log(err);
        });

        this.setState({
            messageInput: '',
            messageSent: true
        });
    }

    connectWebsocket = () => {
        if(this.props.channelId != 0){
            //If we select a new channel and a previous WebSocket instance already exists
            if(this.chatSocket instanceof WebSocket)
            {
                this.chatSocket.close();
            }
            console.log(this.props.user.token)
            document.cookie="token="+this.props.user.token+";max-age=1";
            this.chatSocket = new WebSocket(
                baseWebsocketUrl+'/'+ this.props.channelId+'/');
            
            this.chatSocket.onmessage = (e) => {
                let message = JSON.parse(e.data).message;
                if (message.channel_id==this.props.channelId){
                    this.props.addMessage(message);
                    this.setState({
                        messageReceived: true
                    });
                }else if(message.direct_type="false" && message.server_id==this.props.serverId){
                    console.log("New message from another channel but same server, channelId: "+message.channel_id);
                    notifyNewMessage(message.channel_id);
                }else if(message.direct_type="false"){
                    console.log("New message from another server, serverId:"+message.server_id+" channelId: "+message.channel_id);
                    //notifyNewMessage(message.channel_id);
                }else if(message.direct_type="true"){
                    console.log("New message from friend, friendId: "+message.friend_id+" channelId: "+message.channel_id);
                }
            };

            // this.chatSocket.onclose = function(e) {
            //     console.error('Chat socket closed unexpectedly');
            // };
        }
    }

    render() {
        const messagesAvailable = this.props.messages.length > 0;
        
        let dropDownVisibility = {bottom: this.state.chatInputHeight + 10};
        if (!this.state.scrolling && !this.state.messageReceived) {
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
            token:state.auth.token
        },
        channelId:state.channel.activeChannelId,
        serverId:state.server.activeServerId
    }
}

export default connect(mapsStateToProps, {addMessage,notifyNewMessage})(MiddlePane); 
