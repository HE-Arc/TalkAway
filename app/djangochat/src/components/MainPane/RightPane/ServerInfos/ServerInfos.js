import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ServerInfos.css';
import Channel from './Channel/Channel';

import { selectChannel } from "../../../../actions/ChannelAction";
import { requestMessageList } from "../../../../actions/MessageAction";

class ServerInfos extends Component {

    channelSelected = (id) => {
        this.props.selectChannel(id);
        this.props.requestMessageList(id);
    }

    render() {
        let channelComponents = '';
        console.log(this.props.server)
        if (this.props.server.length > 0) {
            const channels = this.props.server[0].channelSet;
            channelComponents = channels.map((channel) => {
                const channelId = Number(channel.id);
                let classes = ["row"];
                if (channelId === this.props.activeChannelId) {
                    classes.push("selected");
                } else {
                    classes.push("selectable");
                }
                return (<div key={channel.id} className={classes.join(' ')}>
                    <Channel name={channel.name} channelSelected={this.channelSelected} idChannel={channel.id} />
                </div>);
            });
        };

        return (
            <div id="serverContainer" className="container">
                <div id="serverButtons" className="row">
                    <button className="buttonServer unselectable">Add user</button>
                    <button className="buttonServer unselectable">Server settings</button>
                </div>
                <hr className="serverhr" />
                <div id="serverChannels" className="row">
                    <div id="channelsContainer" className="container scrollableServer unselectable">
                        {channelComponents}
                    </div>
                </div>
                <hr className="serverhr" />
                <div id="serverUsers" className="row">
                    {/* TODO Add user section */}
                </div>
            </div>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        server: state.server.servers.filter(c => Number(c.id) === state.server.activeServerId),
        activeChannelId: state.channel.activeChannelId
    }
}

export default connect(mapsStateToProps, { selectChannel, requestMessageList })(ServerInfos); 
