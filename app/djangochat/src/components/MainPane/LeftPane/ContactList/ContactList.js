import React, { Component } from 'react';
import Contact from './Contact/Contact';
import './ContactList.css';

class ContactList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            serverDisplayed: true,
            friends: null,
            servers: null
        }
        this.displayServers = this.displayServers.bind(this);
        this.displayFriends = this.displayFriends.bind(this);
        this.generateFakeServers = this.generateFakeServers.bind(this);

        this.generateFakeServers();
    }

    generateFakeServers() {
        var servers = []
        servers.push({
            name: "Server 1",
            connected: 2,
            max: 10}
        )
        servers.push({
            name: "Server 2",
            connected: 1,
            max: 1}
        )
        servers.push({
            name: "Server 3",
            connected: 4,
            max: 6}
        )
        servers.push({
            name: "Server 4",
            connected: 3,
            max: 20}
        )
        /*this.setState({
            servers: servers
        })*/
        this.state.servers = servers;
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

        var styleServers;
        var styleFriends;
        if (this.state.serverDisplayed) {
            styleServers = blue
            styleFriends = white;
        } else {
            styleServers = white
            styleFriends = blue;
        }

        var res = [];
        for (var i = 0; i < this.state.servers.length; i++) {
            res.push(<div key={i} className="row"><Contact server={this.state.servers[i]}/></div>);
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
                {res}
            </div>
        );
    }
}

export default ContactList; 
