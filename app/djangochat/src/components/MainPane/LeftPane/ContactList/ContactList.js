import React, { Component } from 'react';
import Server from './Contact/Server';
import Friend from './Contact/Friend';
import './ContactList.css';

class ContactList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            serverDisplayed: true,
            friendlock: 0,
            serverlock: 0,
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
                max: 20},{
                name: "Server 5",
                connected: 1,
                max: 2},{
                name: "Server 6",
                connected: 5,
                max: 6},{
                name: "Server 7",
                connected: 5,
                max: 8},{
                name: "Server 8",
                connected: 10,
                max: 10},{
                name: "Server 9",
                connected: 4,
                max: 11},{
                name: "Server 10",
                connected: 10,
                max: 13}
            ]
        }
        this.displayServers = this.displayServers.bind(this);
        this.displayFriends = this.displayFriends.bind(this);
        this.friendSelected = this.friendSelected.bind(this);
        this.serverSelected = this.serverSelected.bind(this);
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

    friendSelected(id) {
        this.setState({
            friendlock: id
        })
    }

    serverSelected(id) {
        this.setState({
            serverlock: id
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
            styleServers = blue;
            styleFriends = white;
            for (var i = 0; i < this.state.servers.length; i++) {
                let classes = ["row"];
                if (i === this.state.serverlock) {
                    classes.push("selected");
                } else {
                    classes.push("selectable");
                }
                contactRows.push(<div key={i} className={classes.join(' ')}><Server contact={this.state.servers[i]} serverSelected={this.serverSelected} idServer={i}/></div>);
            }
        } else {
            styleServers = white;
            styleFriends = blue;
            for (var j = 0; j < this.state.friends.length; j++) {
                let classes = ["row"];
                if (j === this.state.friendlock) {
                    classes.push("selected");
                } else {
                    classes.push("selectable");
                }
                contactRows.push(<div key={j + this.state.servers.length} className={classes.join(' ')}><Friend contact={this.state.friends[j]} friendSelected={this.friendSelected} idFriend={j}/></div>);
            }
        }

        // Return the component
        return (
            <div className="container" style={{paddingTop: '10px', height: '100%'}}>
                <div className="row contactSelector unselectable" style={{marginBottom: '20px'}}>
                    <div className="col-5 text-right cursor" onClick={this.displayServers} style={{color: styleServers, padding: 0, fontSize: '2em'}}>
                        Servers
                    </div>
                    <div className="col-2 text-center" style={{padding: 0, fontSize: '2em'}}>
                        /
                    </div>
                    <div className="col-5 text-left cursor" onClick={this.displayFriends} style={{color: styleFriends, padding: 0, fontSize: '2em'}}>
                        Friends
                    </div>
                </div>
                <div className="container scrollable unselectable">
                    {contactRows}
                </div>
            </div>
        );
    }
}

export default ContactList; 
