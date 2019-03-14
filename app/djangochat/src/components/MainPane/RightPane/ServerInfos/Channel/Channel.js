import React, { Component } from 'react';
import './Channel.css';

class Channel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            idChannel: props.idChannel,
            channelSelected: props.channelSelected
        }

        this.select = this.select.bind(this);
    }

    select() {
        this.state.channelSelected(this.state.idChannel);
    }

    render() {
        return (
            <div className="channel" onClick={this.select}>
                {this.state.name}
            </div>
        );
    }
}

export default Channel; 
