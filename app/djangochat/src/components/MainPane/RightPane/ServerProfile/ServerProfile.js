import React, { Component } from 'react';
import './ServerProfile.css';

class ServerProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    render() {
        // Return the component
        return (
            <div className="container unselectable">
                <div id="rowProfile" className="row">
                    <div id="image" className="col-3">
                        <img alt="" src={require('./images/profile.png')} width="70" height="70"/>
                    </div>
                    <div id="servername" className="col-9">
                        Servername
                    </div>
                </div>
            </div>
        );
    }
}

export default ServerProfile; 
