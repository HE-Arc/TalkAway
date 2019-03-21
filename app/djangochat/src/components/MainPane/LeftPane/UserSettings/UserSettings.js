import React, { Component } from 'react';
import './UserSettings.css';

class UserSettings extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            activity: "Connected",
            time: Date.now(),
            delay: 10000
        };
        this.checkActivity = this.checkActivity.bind(this);
        this.openSettings = this.openSettings.bind(this);

        setInterval(this.checkActivity, 1000);
    }

    checkActivity() {
        if (Date.now() - this.state.time > this.state.delay)
        {
            this.setState({
                activity: "Away"
            })
        }
    }
    
    openSettings() {
        this.setState({
            activity: "Connected",
            time: Date.now()
        })
        alert("Settings needs to be implemented");
    }

    render() {
        // Find appropritate state image
        var connectionImg;
        switch (this.state.activity)
        {
            case "Away":    
                connectionImg = require('./images/away.png');
                break;
            default:
                connectionImg = require('./images/connected.png');
        }

        // Return the component
        return (
            <div id="rowProfile">
                <div id="images">
                    <img id="image" alt="" src={require('./images/profile.png')}/>
                    <img id="connection" alt="" src={connectionImg}/>
                </div>
                <div id="username">
                    Username
                </div>
                {/*<div id="settingsButton" className="col-5 col-md-2">
                    <img className="cursor" alt="" src={require('./images/settings.png')} width="30" height="30" onClick={this.openSettings}/>
                </div>*/}
            </div>
        );
    }
}

export default UserSettings; 
