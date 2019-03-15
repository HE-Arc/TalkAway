import React, {
    Component
} from 'react';

import {connect} from 'react-redux';

import MessageComponent from './Message/Message';

import {baseWebsocketUrl} from '../../../config/config.js';

class MiddlePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageList: props.messageList,
            messageComponentList : [],
            messageInput:''
        };


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
                user: {
                    username: this.props.username
                },
                text: message,
                date: `${now.getHours()}:${now.getMinutes()}`
            }
        }));

        this.setState({messageInput: ''});
    }

    componentDidMount(){
        let roomName="test"; //TODO: CHANGE THIS
        console.log(
            baseWebsocketUrl+'/'+ roomName+'/')
        this.chatSocket = new WebSocket(
            baseWebsocketUrl+'/'+ roomName+'/');
        
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

const mapsStateToProps = (state) => {
    return {
        username: state.auth.username
    }
}

export default connect(mapsStateToProps)(MiddlePane); 
