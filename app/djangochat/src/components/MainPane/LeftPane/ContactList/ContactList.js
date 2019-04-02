import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr'

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
        serverCreation: false,
        defaultServerSelected: false,
        defaultFriendSelected: false,
        idSelectedServer: 0,
        idSelectedFriend: 0
    }

    constructor(props) {
        super(props);

        this.newUserInput = React.createRef();
        this.props.requestFriendList().catch(()=>{
            toastr.error("Error","Impossible to retrieve friend list")
        });
        this.props.requestServerList().catch(()=>{
            toastr.error("Error","Impossible to retrieve servers list")
        });;
        window.addEventListener("resize", this.updateDimensions);

        this.serverInputRef = React.createRef();
    }

    selectDefaultServer = () => {
        if (this.props.servers.length > 0) {
            const defaultServer = this.props.servers[0];
            this.serverSelected(defaultServer.id);
            
            this.setState({
                defaultServerSelected: true
            })
        }
    }

    selectDefaultFriend = () => {
        if (this.props.friends.length > 0) {
            const defaultFriend = this.props.friends[0];
            this.friendSelected(defaultFriend.friend.id);

            this.setState({
                defaultFriendSelected: true
            })
        }
    }

    updateDimensions = () => {
        this.forceUpdate();
    }

    displayFriends = () => {
        this.setState({
            serverDisplayed: false
        })
        this.props.showFriends();
        this.props.getAllUsers()
            .catch(() => toastr.error("Error", "An internal error occured"));
        if (Number(this.state.idSelectedFriend) > 0) {
            this.friendSelected(this.state.idSelectedFriend);
        }
    }

    displayServers = () => {
        this.setState({
            serverDisplayed: true
        })
        this.props.showServers();
        this.serverSelected(this.state.idSelectedServer);
        this.props.selectChannelAuto(this.state.idSelectedServer);
    }

    friendSelected = (id) => {
        this.props.selectFriend(id);
        const channelId = this.props.friends.filter(f => f.friend.id === id)[0].channelId;
        this.props.requestMessageList(channelId)
        .catch(()=>{
            toastr.error("Error", "Error while retrieving messages")
        });

        this.setState({
            idSelectedFriend: id
        })
    }

    serverSelected = (serverId) => {
        const oldId = this.props.activeServerId;
        this.props.selectServer(serverId);
        if (oldId !== serverId) {
            this.props.requestChannelList(serverId).then(() => {
                this.props.selectChannelAuto(serverId);
            }).catch(()=>{
                toastr.error("Error","Impossible to retrieve channel list")
            });
        }

        this.setState({
            idSelectedServer: serverId
        })
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

            this.props.requestAddFriend(user_id).catch(()=>{
                toastr.error("Error", "Impossible to add this user");
            });

            this.setState({
                addingFriend: false
            });

            this.props.ws.send(JSON.stringify({
                notification: {
                    user_id: user_id,
                    text: this.props.username + " added you in his friendlist",
                    title: "New friend",
                    type: 'friend'
                }
            }));
        }
    }

    showServerCreation = () => {
        this.setState({
            serverCreation: true
        },
            () => {
                this.serverInputRef.current.focus();
            })
    }

    createServer = () => {
        const serverName = String(this.serverInputRef.current.value);
        if (serverName === "") {
            return;
        }

        this.props.requestCreateServer(serverName)
            .then(() => {
                this.setState({
                    serverCreation: false
                })
                this.serverInputRef.current.value = '';
            }).catch((err) => {
                toastr.error("Error", "Impossible to create a server")
            });
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.createServer();
        }
    }

    componentDidUpdate() {
        if (!this.state.defaultFriendSelected) {
            this.selectDefaultFriend();
        }

        if (!this.state.defaultServerSelected) {
            this.selectDefaultServer();
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
                const serverId = server.id;
                let classes = (serverId === this.props.activeServerId) ? classesSelected : classesSelectable;
                return (<div key={serverId} className={classes.join(' ')}>
                    <Server contact={{}} server={server} serverSelected={this.serverSelected} />
                </div>);
            });
        } else {
            contactRows = this.props.friends.map((friend) => {
                const friendId = friend.friend.id;
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
                    <div className="selectorServers cursor" onClick={this.displayServers} style={{ color: styleServers }}>
                        {selectorServersDescription}
                    </div>
                    <div className="selectorSeparator">/</div>
                    <div className="selectorFriends cursor" onClick={this.displayFriends} style={{ color: styleFriends }}>
                        {selectorfriendsDescription}
                    </div>
                </div>
                {!this.state.serverDisplayed ?
                        this.state.addingFriend ?
                            <div className="input-group mb-3">
                                <Autocomplete ref={(newUserInput) => { this.newUserInput = newUserInput; }}
                                    suggestions={this.props.allUsers.map(u => {
                                        return u.username
                                    })}
                                />
                                <div className="input-group-append">
                                    <button onClick={this.addFriend} className="btn btn-primary addFriendAddButton" type="button">Add</button>
                                </div>
                            </div>
                            :
                            <div>
                                <button className="addFriendButton" onClick={this.addingFriend}>Add friend</button>
                            </div>
                        :
                        <div className="full-width">
                            <div className={this.state.serverCreation?"d-none":"full-width"}>
                                <button className="addServerButton" onClick={this.showServerCreation}>Create a server</button>
                            </div>
                            <div className={!this.state.serverCreation?"d-none":""}>
                                <div className="input-group addServerField">
                                    <input ref={this.serverInputRef} onKeyPress={this._handleKeyPress} type="text" className="form-control top-margin-input addServerInput" placeholder="Server name" aria-label="Server name" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button onClick={this.createServer} className="btn btn-primary addServerFieldAddButton" type="button">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                <div className="contactList container scrollable unselectable">
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
        ws: state.ws.ws,
        username: state.auth.username,
        allUsers: state.contact.users.filter(
            u => {
                return u.id !== state.auth.id && state.friend.friends.filter(f => {
                    return f.friend.id === u.id;
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
