import React, { Component } from 'react';
import './Friend.css';

class Friend extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            idFriend: props.idFriend,
            name: props.contact.username,
            selected: false,
            friendSelected: props.friendSelected
        }
        this.select = this.select.bind(this);
    }

    select() {
        this.setState({
            selected: true
        })
        this.state.friendSelected(this.state.idFriend);
    }

    render() {
        return (
            <div id="containerClient" className="container" onClick={this.select}>
                <div className="row">
                    <div className="col-3">
                        <img alt="" src={require('./images/profile.png')} width="50" height="50"/>
                    </div>
                    <div className="col-9 textClient">
                        {this.state.name}
                    </div>
                </div>
            </div>
        );
    }
}

export default Friend; 
