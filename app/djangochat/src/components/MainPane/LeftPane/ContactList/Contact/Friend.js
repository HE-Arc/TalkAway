import React, { Component } from 'react';
import './Friend.css';

class Friend extends Component {
    render() {
        return (
            <div className="containerFriend" onClick={() => this.props.friendSelected(this.props.friend.id)}>
                <div id="contactFriendImages">
                    <img id="contactFriendImage" alt="" src={require('./images/profile.png')}/>
                </div>
                <div id="contactFriendName">
                    {this.props.friend.username}
                </div>
            </div>
        );
    }
}

export default Friend; 
