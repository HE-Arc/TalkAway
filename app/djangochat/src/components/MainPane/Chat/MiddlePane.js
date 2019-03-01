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
        //TODO: find a way to create multiple MessageComponent
        let messageList=Object.keys(this.state.messageList).forEach(key => {
            <MessageComponent messageObject={this.state.messageList[key]}/>;
        });
        
        console.log(messageList)
        return(
            <div>
                {messageList}
                <ChatInputComponent/>
            </div>
        );
    }
}

export default MiddlePane;