import React from 'react';
import './Friend.css';

const Friend = props => {
    return (
        <div id="containerClient" className="container" onClick={()=>props.friendSelected(props.friend.friend.id)}>
            <div className="row">
                <div className="col-3">
                    <img alt="" src={require('./images/profile.png')} width="50" height="50"/>
                </div>
                <div className="col-9 textClient">
                    {props.friend.friend.username}
                </div>
            </div>
        </div>
    );
}

export default Friend; 
