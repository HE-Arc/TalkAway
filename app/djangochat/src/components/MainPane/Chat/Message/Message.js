import React, {
    Component
} from 'react';
import './Message.css';

class MessageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageObject: props.messageObject
        };
    }

    render() {
        return (
            <div className="messageBox">
                <div className="messagePicture">
                    <img id="messageImage" alt="" src={require('./images/profile.png')} width="50" height="50"/>
                </div>
                <div className="messageContent">
                    <div>
                        <p id="sender">{this.state.messageObject.user.username}</p><p id="time">{this.state.messageObject.date}</p>
                    </div>
                    <div id="message">
                        {/*Source https://medium.com/@kevinsimper/react-newline-to-break-nl2br-a1c240ba746*/}
                        {this.state.messageObject.text.split('\n').map((item, key) => {
                            return <span key={key}>{item}<br/></span>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageComponent;