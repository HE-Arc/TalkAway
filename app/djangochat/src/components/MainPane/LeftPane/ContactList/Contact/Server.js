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
        let connectivity = "";
        if (this.state.connected !== -1 && this.state.max !== -1)
        {
            connectivity = "(" + this.state.connected + "/" + this.state.max + ")";
        }

        return (
            <div id="containerServer" className="container" onClick={() => this.props.serverSelected(this.props.server.id)}>
                <div className="row">
                    <div className="pr-2">
                        <img alt="" src={require('./images/profile.png')} width="50" height="50"/>
                    </div>
                    <div className="col-6 col-sm-6 textServer">
                        {this.props.server.name}
                    </div>
                    <div className="col-3 d-none textServer">
                        {connectivity}
                    </div>
                </div>
            </div>
        );
    }
}

export default Server; 
