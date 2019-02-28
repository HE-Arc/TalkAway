import React, { Component } from 'react';
import MessageComponent from './Message/Message';
import ChatInputComponent from './ChatInput/ChatInput';

class MiddlePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageList: props.messageList
        };
    }

    render() {
        let messageList=Array(this.state.messageList).forEach(message => {
            return <MessageComponent messageObject={message}/>
        });
        

        return(
            <div>
                {messageList}
                <ChatInputComponent/>
            </div>
        );
    }
}

export default MiddlePane;