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

    componentWillUnmount(){
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
            <div id="rowProfile" onClick={this.openSettings}>
                <div id="images">
                    <img id="image" alt="" src={require('./images/profile.png')}/>
                    <img id="connection" alt="" src={connectionImg}/>
                </div>
                <div id="username">
                    {this.props.username}
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
