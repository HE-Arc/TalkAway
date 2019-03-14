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
                        username: "Etienne"
                    },
                    text: "Salut",
                    date: "09:23"
                },
                id_message2: {
                    user: {
                        username: "Bastien"
                    },
                    text: "Bonjour",
                    date: "09:24"
                },
                id_message3: {
                    user: {
                        username: "Sergy"
                    },
                    text: "Coucou",
                    date: "09:26"
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
                    <div className="col-6 middlepane pane">
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