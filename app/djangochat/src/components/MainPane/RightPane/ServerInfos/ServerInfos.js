import React, { Component } from 'react';
import './ServerInfos.css';

class ServerInfos extends Component {

    render() {
        return (
            <div id="serverContainer" className="container">
                <div id="serverButtons" className="row p-t-1 p-x-2">
                    <button className="btn btn-primary btn-block">Add user</button>
                    <button className="btn btn-primary btn-block">Server settings</button>
                </div>
                <div id="serverChannels" className="row">

                </div>
                <div id="serverUsers" className="row">

                </div>
            </div>
        );
    }
}

export default ServerInfos; 
