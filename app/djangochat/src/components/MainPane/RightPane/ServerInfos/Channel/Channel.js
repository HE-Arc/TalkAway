import React, { Component } from 'react';
import './Channel.css';

class Channel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name
        }
    }

    render() {
        return (
            <div className="channel">
                {this.state.name}
            </div>
        );
    }
}

export default Channel; 
