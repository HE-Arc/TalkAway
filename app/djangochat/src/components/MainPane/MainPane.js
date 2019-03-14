import React, {
    Component
} from 'react';
import LeftPane from './LeftPane/LeftPane';
import MiddlePane from './Chat/MiddlePane';
import RightPane from './RightPane/RightPane';
import './MainPane.css';

class MainPane extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messageList: JSON.parse(JSON.stringify({
                id_message1: {
                    user: {
                        username: "Jacques"
                    },
                    text: "test",
                    date: "09:23"
                },
                id_message2: {
                    user: {
                        username: "Jacques"
                    },
                    text: "test2",
                    date: "10:23"
                }
            }))
        };
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row fullHeight">
                    <div className="col-3 sidepane pane text-white">
                        <LeftPane/>
                    </div>
                    <div className="col-6 pane">
                        <MiddlePane messageList={this.state.messageList}/>
                    </div>
                    <div className="col-3 sidepane pane">
                        <RightPane/>
                    </div>
                </div>
            </div> 
        );
    }
}

export default MainPane;