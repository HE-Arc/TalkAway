import React, { Component } from 'react';
import LeftPane from './LeftPane/LeftPane';
import MiddlePane from './Chat/MiddlePane';

class MainPane extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            messageList:JSON.parse(JSON.stringify(
                {
                    id_message1:{
                    user: {
                        username: "Jacques"
                    },
                    text: "test",
                    date: "09:23"
                    }, id_message2:{
                    user: {
                        username: "Jacques"
                    },
                    text: "test2",
                    date: "10:23"
                    }
                }
            )
            )};
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