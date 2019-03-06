import React, { Component } from 'react';
import './Friend.css';

class Friend extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: props.contact.name
        }
    }

    render() {
        return (
            <div id="containerClient" className="container">
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
