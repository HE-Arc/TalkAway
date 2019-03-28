import React, { Component } from 'react';
import {connect} from 'react-redux';

import Server from './Contact/Server';
import Friend from './Contact/Friend';
import './ContactList.css';

import {requestMessageList} from "../../../../actions/MessageAction";
import {requestChannelList} from "../../../../actions/ChannelAction";
import {requestServerList, selectServer} from "../../../../actions/ServerAction";
import {requestFriendList, selectFriend} from "../../../../actions/FriendAction";

class ContactList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            serverDisplayed: true,
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
        this.props.selectFriend(id);
        const channelId = this.props.friends.filter(f=>f.friend.id === id)[0].channelId;
        this.props.requestMessageList(channelId);
    }

    serverSelected = (id) => {
        this.props.selectServer(id);
        this.props.requestChannelList(id);
    }

    render() {
        // Update the displayed list
        const white = '#FFFFFF';
        const blue = '#0D6CB8';
        let contactRows = [];
        const classesSelected = ["row", "selected"];
        const classesSelectable = ["row", "selectable"];

        const [styleServers, styleFriends] = this.state.serverDisplayed ? [blue, white] : [white, blue];
        if (this.state.serverDisplayed) {
            contactRows = this.props.servers.map((server)=>{
                const serverId = Number(server.id);
                let classes = (serverId === this.props.activeServerId) ? classesSelected : classesSelectable;
                return( <div key={serverId} className={classes.join(' ')}>
                            <Server contact={{}} server={server} serverSelected={this.serverSelected}/>
                        </div>);
            });
        } else {
            contactRows = this.props.friends.map((friend)=>{
                const friendId = Number(friend.friend.id);
                let classes = (friendId === this.props.activeFriendId) ? classesSelected : classesSelectable;
                return( <div key={friend.friend.id + this.props.servers.length} className={classes.join(' ')}>
                            <Friend friend={friend} friendSelected={this.friendSelected}/>
                        </div>);
            });
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
        activeServerId: state.server.activeServerId,
        friends: state.friend.friends,
        activeFriendId: state.friend.activeFriendId,
    }
}

const mapDispatchToProps= {
    requestServerList,
    requestFriendList,
    requestMessageList,
    requestChannelList,
    selectServer,
    selectFriend,
}

export default connect(mapsStateToProps, mapDispatchToProps)(ContactList); 
