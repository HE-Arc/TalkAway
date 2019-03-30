import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ServerProfile.css';

class ServerProfile extends Component {
    render() {
        // Return the component
        let imageServer;
        if (this.props.activeServer[0] !== undefined && this.props.activeServer[0].image !== '') {
            imageServer = this.props.activeServer[0].image;
        }
        else {
            imageServer = require('./images/profile.png');
        }
        return (
            <div id="rowProfileServer">
                <div id="divImageServer">
                    <img id="imageServer" alt="" src={imageServer} width="50" height="50" />
                </div>
                <div id="servername">
                    {this.props.activeServer[0] !== undefined ? this.props.activeServer[0].name : "X"}
                </div>
            </div>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        activeServer: state.server.servers.filter(s => s.id === state.server.activeServerId)
    }
}

export default connect(mapsStateToProps)(ServerProfile);
