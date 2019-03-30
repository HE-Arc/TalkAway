import React, { Component } from 'react';
import { connect } from 'react-redux';

import Server from './Contact/Server';
import Friend from './Contact/Friend';
import './ContactList.css';

import { requestMessageList } from "../../../../actions/MessageAction";
import { requestChannelList, selectChannelAuto } from "../../../../actions/ChannelAction";
import { requestServerList, requestCreateServer, selectServer } from "../../../../actions/ServerAction";
import { requestFriendList, selectFriend, requestAddFriend } from "../../../../actions/FriendAction";
import { showFriends, showServers, getAllUsers } from "../../../../actions/ContactAction";

import Autocomplete from "../../RightPane/Autocomplete/Autocomplete";

class ContactList extends Component {
    
    state = {
        serverDisplayed: true,
        addingFriend: false,
        serverCreation: false
    }

    constructor(props) {
        super(props);

        this.newUserInput = React.createRef();
        this.props.requestFriendList();
        this.props.requestServerList();
        window.addEventListener("resize", this.updateDimensions);

        this.serverInputRef = React.createRef();
    }

    updateDimensions = () => {
        this.forceUpdate();
    }

    displayFriends = () => {
        this.setState({
            serverDisplayed: false
        })
        this.props.showFriends();
        this.props.getAllUsers();
    }

    displayServers = () => {
        this.setState({
            serverDisplayed: true
        })
        this.props.showServers();
    }

    friendSelected = (id) => {
        this.props.selectFriend(id);
        const channelId = this.props.friends.filter(f => f.friend.id === id)[0].channelId;
        this.props.requestMessageList(channelId);
    }

    serverSelected = (id) => {
        let serverId = Number(id);
        this.props.selectServer(serverId);
        this.props.requestChannelList(serverId).then(() => {
            this.props.selectChannelAuto(serverId);
        });
    }

    addingFriend = () => {
        this.setState({
            addingFriend: true
        });
    }

    addFriend = () => {
        if (this.newUserInput.state.userInput !== "" && this.props.allUsers.filter(u => {
            return u.username === this.newUserInput.state.userInput
        }).length > 0) {
            let user_id = this.props.allUsers.filter(u => {
                return u.username === this.newUserInput.state.userInput
            })[0].id;

            this.props.requestAddFriend(user_id);

            this.setState({
                addingFriend: false
            });
        }
    }

    showServerCreation = () => {
        this.setState({
            serverCreation: true
        },
        ()=>{
            this.serverInputRef.current.focus();
        })
    }
    
    createServer = () => {
        const serverName = String(this.serverInputRef.current.value);
        if(serverName === ""){
            return;
        }

        this.props.requestCreateServer(serverName)
        .then(()=>{
            this.setState({
                serverCreation: false
            })
            this.serverInputRef.current.value = '';
        }).catch((err)=>{
            console.log(err)
        });
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.createServer();
        }
    }

    render() {
        // Update the displayed list
        const white = '#FFFFFF';
        const blue = '#0D6CB8';
        let contactRows = [];
        const classesSelected = ["row", "contact", "selected"];
        const classesSelectable = ["row", "contact", "selectable"];

        const [styleServers, styleFriends] = this.state.serverDisplayed ? [blue, white] : [white, blue];
        if (this.state.serverDisplayed) {
            contactRows = this.props.servers.map((server) => {
                const serverId = Number(server.id);
                let classes = (serverId === this.props.activeServerId) ? classesSelected : classesSelectable;
                return (<div key={serverId} className={classes.join(' ')}>
                    <Server contact={{}} server={server} serverSelected={this.serverSelected} />
                </div>);
            });
        } else {
            contactRows = this.props.friends.map((friend) => {
                const friendId = Number(friend.friend.id);
                let classes = (friendId === this.props.activeFriendId) ? classesSelected : classesSelectable;
                return (<div key={friend.friend.id + this.props.servers.length} className={classes.join(' ')}>
                    <Friend friend={friend} friendSelected={this.friendSelected} />
                </div>);
            });
        }

        let selectorServersDescription = "S";
        let selectorfriendsDescription = "F";
        if (window.innerWidth > 767) {
            selectorServersDescription = "Servers";
            selectorfriendsDescription = "Friends";
        }

        // Return the component
        return (
            <div style={{ paddingTop: '10px', height: '100%', width: '100%' }}>
                <div className="contactSelector unselectable">
                    <div id="selectorServers" className="cursor" onClick={this.displayServers} style={{ color: styleServers }}>
                        {selectorServersDescription}
                    </div>
                    <div id="selectorSeparator">/</div>
                    <div id="selectorFriends" className="cursor" onClick={this.displayFriends} style={{ color: styleFriends }}>
                        {selectorfriendsDescription}
                    </div>
                </div>
                <div id="contactList" className="container scrollable unselectable">
                    {!this.state.serverDisplayed ?
                        this.state.addingFriend ?
                            <div className="input-group mb-3">
                                <Autocomplete ref={(newUserInput) => { this.newUserInput = newUserInput; }}
                                    suggestions={this.props.allUsers.map(u => {
                                        return u.username
                                    })}
                                />
                                <div className="input-group-append">
                                    <button onClick={this.addFriend} className="btn btn-primary col" type="button">Add</button>
                                </div>
                            </div>
                            :
                            <div>
                                <button onClick={this.addingFriend}>Add friend</button>
                            </div>
                        :
                        <div className="row mb-3">
                            <div className={this.state.serverCreation?"d-none":""}>
                                <button onClick={this.showServerCreation}>Create a server</button>
                            </div>
                            <div className={!this.state.serverCreation?"d-none":""}>
                                <div className="input-group mb-3">
                                    <input ref={this.serverInputRef} onKeyPress={this._handleKeyPress} type="text" className="form-control" placeholder="Server name" aria-label="Server name" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button onClick={this.createServer} className="btn btn-primary" type="button">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
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
        allUsers: state.contact.allUsers.users.filter(
            u => {
                return Number(u.id) !== Number(state.auth.id) && state.friend.friends.filter(f => {
                    return Number(f.friend.id) === Number(u.id);
                }).length === 0;
            }
        )
    }
}

const mapDispatchToProps = {
    selectServer,
    selectFriend,
    showFriends,
    showServers,
    getAllUsers,
    requestAddFriend,
    selectChannelAuto,
    requestServerList,
    requestFriendList,
    requestMessageList,
    requestChannelList,
    requestCreateServer,
}

export default connect(mapsStateToProps, mapDispatchToProps)(ContactList); 
