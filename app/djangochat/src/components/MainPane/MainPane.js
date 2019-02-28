import React, { Component } from 'react';
import LeftPane from './LeftPane/LeftPane';
import MiddlePane from './Chat/MiddlePane';

class MainPane extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            messageList:JSON.stringify("{}")
        };
    }

    render() {
        return(
            <div>
                <LeftPane/>
                <MiddlePane messageList={this.state.messageList}/>
            </div>
        );
    }
}

export default MainPane;