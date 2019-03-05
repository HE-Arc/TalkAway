import React, { Component } from 'react';
import './UserSettings.css';

class LeftPane extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            activity: "Connected",
            time: 0,
            delay: 10000
        };
        this.startTimer = this.startTimer.bind(this)
        this.checkActivity = this.checkActivity.bind(this);
        this.openSettings = this.openSettings.bind(this);

        this.startTimer();
    }

    startTimer() {
        this.state.time = Date.now();
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
            <div className="container">
                <div className="row" style={{height: '100%', textAlign: 'center'}}>
                    <div className="col-3" style={{paddingTop: '20px', paddingRight: '0', paddingLeft: '30px'}}>
                        <img alt="" src={require('./images/profile.png')} width="70" height="70"/>
                        <img id="connection" alt="" src={connectionImg}/>
                    </div>
                    <div className="col-6" style={{paddingTop: '35px', paddingLeft: '10px', fontSize: '1.5em', color: '#000000'}}>
                        Username
                    </div>
                    <div className="col-3" style={{paddingTop: '35px', paddingLeft: '0'}}>
                        <img alt="" src={require('./images/settings.png')} width="40" height="40" onClick={this.openSettings}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftPane; 
