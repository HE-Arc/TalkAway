import React, { Component } from 'react';
import './UserSettings.css';

class LeftPane extends Component {
    
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
            <div className="container unselectable">
                <div id="rowProfile" className="row">
                    <div id="image" className="col-3">
                        <img alt="" src={require('./images/profile.png')} width="70" height="70"/>
                        <img id="connection" alt="" src={connectionImg}/>
                    </div>
                    <div id="username" className="col-6">
                        Username
                    </div>
                    <div id="settingsButton" className="col-3">
                        <img className="cursor" alt="" src={require('./images/settings.png')} width="40" height="40" onClick={this.openSettings}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftPane; 
