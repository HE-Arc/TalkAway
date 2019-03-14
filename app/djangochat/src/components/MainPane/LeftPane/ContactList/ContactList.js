import React, { Component } from 'react';
import {connect} from 'react-redux';

import Server from './Contact/Server';
import Friend from './Contact/Friend';
import './ContactList.css';

import {requestServerList} from "../../../../actions/ServerAction";
import {requestFriendList} from "../../../../actions/FriendAction";

class ContactList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            serverDisplayed: true,
            friendlock: 0,
            serverlock: 0,
        }

        this.props.requestFriendList();
        this.props.requestServerList();
    }

    displayServers = () => {
        this.setState({
            serverDisplayed: true
        })
    }

    displayFriends = () => {
        this.setState({
            serverDisplayed: false
        })
    }

    friendSelected = (id) => {
        this.setState({
            friendlock: id
        })
    }

    serverSelected = (id) => {
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
            for (var i = 0; i < this.props.servers.length; i++) {
                let classes = ["row"];
                if (i === this.state.serverlock) {
                    classes.push("selected");
                } else {
                    classes.push("selectable");
                }
                contactRows.push(<div key={i} className={classes.join(' ')}>
                <Server contact={this.props.servers[i]} serverSelected={this.serverSelected} idServer={i}/></div>);
            }
        } else {
            styleServers = white;
            styleFriends = blue;
            for (var j = 0; j < this.props.friends.length; j++) {
                let classes = ["row"];
                if (j === this.state.friendlock) {
                    classes.push("selected");
                } else {
                    classes.push("selectable");
                }
                contactRows.push(<div key={j + this.props.servers.length} className={classes.join(' ')}>
                <Friend contact={this.props.friends[j]} friendSelected={this.friendSelected} idFriend={j}/></div>);
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

const mapsStateToProps = (state) => {
    return {
        servers: state.server.servers,
        friends: state.friend.friends
    }
}

export default connect(mapsStateToProps, {requestServerList, requestFriendList})(ContactList); 
