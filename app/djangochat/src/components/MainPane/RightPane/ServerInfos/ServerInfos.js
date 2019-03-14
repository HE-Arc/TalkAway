import React, { Component } from 'react';
import './ServerInfos.css';
import Channel from './Channel/Channel';

class ServerInfos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            channels: ["Channel 1", "Channel 2", "Channel 3", "Channel 4", "Channel 5", 
                "Channel 6", "Channel 7", "Channel 8", "Channel 9", "Channel 10"]
        };
    }

    render() {
        var channels = [];
        for (var i = 0; i < this.state.channels.length; i++) {
            channels.push(  <div key={i}>
                                <Channel name={this.state.channels[i]} idChannel={i}/>
                            </div>);
        }

        return (
            <div id="serverContainer" className="container">
                <div id="serverButtons" className="row">
                    <button className="buttonServer unselectable">Add user</button>
                    <button className="buttonServer unselectable">Server settings</button>
                </div>
                <hr className="serverhr"/>
                <div id="serverChannels" className="row">
                    <div id="channelsContainer" className="container scrollableServer unselectable">
                        {channels}
                    </div>
                </div>
                <hr className="serverhr"/>
                <div id="serverUsers" className="row">

                </div>
            </div>
        );
    }
}

export default ServerInfos; 
