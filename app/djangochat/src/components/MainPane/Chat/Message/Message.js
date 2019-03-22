import React from 'react';
import './Message.css';

const MessageComponent = (props) => {
    return (
        <div className="messageBox">
            <div className="messagePicture">
                <img id="messageImage" alt="" src={require('./images/profile.png')} width="50" height="50"/>
            </div>
            <div className="messageContent">
                <div>
                    <p id="sender">{this.props.messageObject.user.username}</p><p id="time">{this.props.messageObject.date}</p>
                </div>
                <div id="message">
                    {this.props.messageObject.text.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>
                    })}
                </div>
            </div>
        </div>
    );
}

export default MessageComponent;