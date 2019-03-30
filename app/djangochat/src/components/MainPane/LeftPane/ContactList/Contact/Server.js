import React, { Component } from 'react';
import './Server.css';

class Server extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            connected: props.contact.connected,
            max: props.contact.max,
        }
    }

    render() {
        let imageServer;
        if (this.props.server.image !== '') {
            imageServer = this.props.server.image;
        }
        else {
            imageServer = require('./images/profile.png');
        }

        /*let connectivity = "";
        if (this.state.connected !== -1 && this.state.max !== -1)
        {
            connectivity = "(" + this.state.connected + "/" + this.state.max + ")";
        }*/

        return (
            <div className="containerServer" onClick={() => this.props.serverSelected(this.props.server.id)}>
                <div id="contactServerImages">
                    <img className="contactServerImage" alt="" src={imageServer}/>
                </div>
                <div className="contactServerName">
                    {this.props.server.name}
                </div>
                {/*<div className="col-3 textServer">
                    {connectivity}
                </div>*/}
            </div>
        );
    }
}

export default Server; 
