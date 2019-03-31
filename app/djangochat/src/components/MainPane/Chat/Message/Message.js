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
        //FIXME: Display users image
        const message = this.props.messageObject;
        
        let author;
        if(this.props.auth.id === message.user.id){
            author = this.props.auth;
        }else{
            author = this.props.contact.allUsers.users.filter(u=>u.id === message.user.id)[0];
        }
        
        let imageprofile;
        if (author !== undefined && author.image !== '') {
            imageprofile = author.image;
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
                    <div>
                        <p id="sender">{message.user.username}</p><p id="time">{this.extractTime(message.date)}</p>
                    </div>
                    <div id="message">
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