import React, { Component } from 'react';
import './Channel.css';

class Channel extends Component {

    select = () => {
        this.props.channelSelected(this.props.idChannel);
    }

    render() {
        return (
            <div className="channel" onClick={this.select}>
                {this.props.name}
            </div>
        );
    }
}

export default Channel; 
