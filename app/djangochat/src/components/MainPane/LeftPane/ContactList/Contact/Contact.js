import React, { Component } from 'react';
import './Contact.css';

class Contact extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: "Contact name",
            connected: 3,
            max: 10
        }
    }

    render() {
        var connectivity = "";
        if (this.state.connected != -1 && this.state.max != -1)
        {
            connectivity = "(" + this.state.connected + "/" + this.state.max + ")";
        }

        return (
            <div className="container" style={{margin: '5px'}}>
                <div className="row">
                    <div className="col-3">
                        <img alt="" src={require('./images/profile.png')} width="50" height="50"/>
                    </div>
                    <div className="col-6" style={{padding: 0, paddingTop: '10px', fontSize: '1.2em'}}>
                        {this.state.name}
                    </div>
                    <div className="col-3" style={{padding: 0, paddingTop: '10px', fontSize: '1.2em'}}>
                        {connectivity}
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact; 
