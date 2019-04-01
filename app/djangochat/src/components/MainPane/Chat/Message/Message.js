import React, { Component } from 'react';
import './Message.css';

class MessageComponent extends Component {

    extractTime(date) {
        const index = date.toString().indexOf("T");
        if (index >= 0) {
            return date.substring(index + 1, index + 9);
        } else {
            return "--:--:--";
        }
    }

    render() {
        const message = this.props.messageObject;

        let imageprofile;
        if (this.props.images[message.user.id] !== '') {
            imageprofile = this.props.images[message.user.id];
        }
        else {
            imageprofile = require('./images/profile.png');
        }

        return (
            <div className="messageBox">
                <div className="messagePicture">
                    <img className="messageImage" alt="" src={imageprofile} width="50" height="50"/>
                </div>
                <div className="messageContent">
                    <div className="messageHeader">
                        <p className="sender">{message.user.username}</p><p className="time">{this.extractTime(message.date)}</p>
                    </div>
                    <div className="message">
                        {/*Source https://medium.com/@kevinsimper/react-newline-to-break-nl2br-a1c240ba746*/}
                        {message.text.split('\n').map((item, key) => {
                            return <span key={key}>{item}<br/></span>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageComponent;