import React, {
    Component
} from 'react';
import LeftPane from './LeftPane/LeftPane';
import MiddlePane from './Chat/MiddlePane';

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
            <div id="container" className="container-fluid">
                <div className="row" style={{width: '100vw'}}>
                    <div className="col-3 bg-dark text-white" style={{height: '100vh', padding: 0}}>
                        <LeftPane/>
                    </div>
                    <div className="col-6" style={{height: '100vh', padding: 0}}>
                        <MiddlePane messageList={this.state.messageList}/>
                    </div>
                    <div className="col-3 bg-dark" style={{height: '100vh', padding: 0}}>
                        
                    </div>
                </div>
            </div> 
        );
    }
}

export default MainPane;