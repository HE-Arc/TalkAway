import React, { Component } from 'react';
import {connect} from 'react-redux';

import './ServerInfos.css';
import Channel from './Channel/Channel';

import {selectChannel} from "../../../../actions/ChannelAction";

class ServerInfos extends Component {

    channelSelected = (id) => {
        this.props.selectChannel(id);
    }

    render() {
        const channels = this.props.channels.map((channel)=>{
            let classes = ["row"];
            if (this.props.activeChannelId === channel.id) {
                classes.push("selected");
            } else {
                classes.push("selectable");
            }
            return( <div key={channel.id} className={classes.join(' ')}>
                        <Channel name={channel.name} channelSelected={this.channelSelected} idChannel={channel.id}/>
                    </div>);
        })

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

const mapsStateToProps = (state) => {
    return {
        channels: state.channel.channels,
        activeChannelId: state.channel.activeChannelId
    }
}

export default connect(mapsStateToProps, {selectChannel})(ServerInfos); 

