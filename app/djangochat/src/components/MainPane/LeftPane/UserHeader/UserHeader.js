import React, { Component } from 'react';
import './UserHeader.css';

import {connect} from 'react-redux';

class UserHeader extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            activity: "Connected",
            time: Date.now(),
            delay: 10000
        };

        this.refresh = setInterval(this.checkActivity, 1000);
    }

    //TODO: Change function name to unmount event
    destroy(){
        console.log("unmount")
        clearInterval(this.refresh);
    }

    checkActivity = () => {
        if (Date.now() - this.state.time > this.state.delay)
        {
            this.setState({
                activity: "Away"
            })
        }
    }
    
    openSettings = () => {
        this.props.switchSettings();
        // this.setState({
        //     activity: "Connected",
        //     time: Date.now()
        // })
        // alert("Settings needs to be implemented");
    }

    render() {
        // Find appropriate state image
        let connectionImg;
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
                    {this.props.username}
                    </div>
                    <div id="settingsButton" className="col-3">
                        <img className="cursor" alt="" src={require('./images/settings.png')} width="40" height="40" onClick={this.openSettings}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        username: state.auth.username
    }
}

export default connect(mapsStateToProps)(UserHeader); 
