import React, { Component } from 'react';
import MiddlePane from '../components/Chat/MiddlePane';

class ChatPage extends Component {

    constructor(props){
        super(props);
        this.setState({
            messageList:JSON.parse("{}")
        });

    }

    render() {
        return (<div>
            <MiddlePane messageList={this.state.messageList}/>
        </div>);
    }
}

export default ChatPage;