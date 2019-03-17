import React, { Component } from 'react';
import './Friend.css';

class Friend extends Component {
    render() {
        return (
            <div id="containerClient" className="container" onClick={()=>this.props.friendSelected(this.props.friend.id)}>
                <div className="row">
                    <div className="col-3">
                        <img alt="" src={require('./images/profile.png')} width="50" height="50"/>
                    </div>
                    <div className="col-9 textClient">
                        {this.props.friend.username}
                    </div>
                </div>
            </div>
        );
    }
}

export default Friend; 
