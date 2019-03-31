import React, { Component } from 'react';
import './Friend.css';

class Friend extends Component {
    render() {
        const friend = this.props.friend.friend;
        let imageProfile;
        if (friend.image !== '') {
            imageProfile = friend.image;
        }
        else {
            imageProfile = require('./images/profile.png');
        }
        return (
            <div className="containerFriend" onClick={() => this.props.friendSelected(friend.id)}>
                <div className="contactFriendImages">
                    <img className="contactFriendImage" alt="" src={imageProfile}/>
                </div>
                <div className="contactFriendName">
                    {friend.username}
                </div>
            </div>
        );
    }
}

export default Friend; 
