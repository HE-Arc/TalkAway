import React, { Component } from 'react';
import Contact from './Contact/Contact';
import './ContactList.css';

class ContactList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            serverDisplayed: true,
            friends: [{
                name: "Friend 1",
                connected: -1,
                max: -1},{
                name: "Friend 2",
                connected: -1,
                max: -1},{
                name: "Friend 3",
                connected: -1,
                max: -1}
            ],
            servers: [{
                name: "Server 1",
                connected: 2,
                max: 10},{
                name: "Server 2",
                connected: 1,
                max: 1},{
                name: "Server 3",
                connected: 4,
                max: 6},{
                name: "Server 4",
                connected: 3,
                max: 20}
            ]
        }
        this.displayServers = this.displayServers.bind(this);
        this.displayFriends = this.displayFriends.bind(this);
    }

    displayServers() {
        this.setState({
            serverDisplayed: true
        })
    }

    displayFriends() {
        this.setState({
            serverDisplayed: false
        })
    }

    render() {
        // Update the displayed list
        var white = '#FFFFFF';
        var blue = '#0D6CB8';
        var contactRows = [];

        var styleServers;
        var styleFriends;
        if (this.state.serverDisplayed) {
            styleServers = blue
            styleFriends = white;
            for (var i = 0; i < this.state.servers.length; i++) {
                contactRows.push(<div key={i} className="row selectable"><Contact contact={this.state.servers[i]}/></div>);
            }
        } else {
            styleServers = white
            styleFriends = blue;
            for (var j = 0; j < this.state.friends.length; j++) {
                contactRows.push(<div key={j + this.state.servers.length} className="row selectable"><Contact contact={this.state.friends[j]}/></div>);
            }
        }

        // Return the component
        return (
            <div className="container" style={{paddingTop: '10px'}}>
                <div className="row" style={{marginBottom: '20px'}}>
                    <div className="col-5 text-right" onClick={this.displayServers} style={{color: styleServers, padding: 0, fontSize: '2em'}}>
                        Servers
                    </div>
                    <div className="col-2 text-center" style={{padding: 0, fontSize: '2em'}}>
                        /
                    </div>
                    <div className="col-5 text-left" onClick={this.displayFriends} style={{color: styleFriends, padding: 0, fontSize: '2em'}}>
                        Friends
                    </div>
                </div>
                {contactRows}
            </div>
        );
    }
}

export default ContactList; 
