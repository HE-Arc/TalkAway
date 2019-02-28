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

        this.state.messageList.map(message => <MessageComponent messageObject={message}/>);

        return(
            <div>
                {this.state.messageList}
                <ChatInputComponent/>
            </div>
        );
    }
}

export default MiddlePane;