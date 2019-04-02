import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ServerInfos.css';
import Channel from './Channel/Channel';

import { selectChannel, requestCreateChannel } from "../../../../actions/ChannelAction";
import { requestMessageList } from "../../../../actions/MessageAction";

import Autocomplete from "../Autocomplete/Autocomplete";
import { getAllUsers } from "../../../../actions/ContactAction";
import { requestAddUser } from "../../../../actions/ServerAction";

class ServerInfos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            channelCreation: false,
            addingUser: false,
            defaultChannelSelected: false
        };

        this.newUserInput = React.createRef();
        this.channelInputRef = React.createRef();
    }

    channelSelected = (id) => {
        this.props.selectChannel(id, true);
        this.props.requestMessageList(id);
    };

    addingUser = () => {
        this.setState({
            addingUser: true
        });
        this.props.getAllUsers();
    };

    addUser = () => {
        if (this.newUserInput.state.userInput !== "" && this.props.allUsers.filter(u => {
            return u.username === this.newUserInput.state.userInput
        }).length > 0) {
            let user_id = this.props.allUsers.filter(u => {
                return u.username === this.newUserInput.state.userInput
            })[0].id;

            this.props.requestAddUser(user_id, this.props.serverId);
            this.props.ws.send(JSON.stringify({
                notification: {
                    user_id: user_id,
                    text: this.props.username + ' added you on server "' + this.props.server.name + '"',
                    title: 'Added to server',
                    type: 'server'
                }
            }));
        }
        this.setState({
            addingUser: false
        });
    }

    showChannelCreation = () => {
        this.setState({
            channelCreation: true
        },
            () => {
                this.channelInputRef.current.focus();
            })
    };

    addChannel = () => {
        const channelName = String(this.channelInputRef.current.value);
        if (channelName === "") {
            return;
        }

        this.props.requestCreateChannel(this.props.serverId, channelName)
            .then(() => {
                this.setState({
                    serverCreation: false
                })
                this.serverInputRef.current.value = '';
            }).catch((err) => {
                console.log(err)
            });
    };

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.addChannel();
        }
    }

    render() {
            let channelComponents = '';
            channelComponents = this.props.channels.map((channel) => {
                const channelId = channel.id;
                let classes = ["row", "channelrow"];
                if (channelId === this.props.activeChannelId) {
                    classes.push("selected");
                } else {
                    classes.push("selectable");
                }
                return (<div key={channel.id} className={classes.join(' ')}>
                    <Channel name={channel.name} channelSelected={this.channelSelected} idChannel={channel.id} />
                </div>);
            });
            
            const users = this.props.server.userSet.map(u => {
                let image = this.props.images[u.id] === '' ? require('../images/profile.png') : this.props.images[u.id];
                return (<div className="col-3" key={u.id}>
                    <p>{u.username}</p>
                    <img className="image-profile2" src={image} alt={u.username} />
                </div>);
            })
            return (
                <div id="serverContainer" className="container">
                    <div className="serverButtons row">
                    {
                        this.state.addingUser ?
                            <div className="input-group mb-3">
                                <Autocomplete ref={(newUserInput) => { this.newUserInput = newUserInput; }}
                                    suggestions={this.props.allUsers.map(u => {
                                        return u.username
                                    })}
                                />
                                <div className="input-group-append">
                                    <button onClick={this.addUser} className="btn btn-primary col" type="button">Add</button>
                                </div>
                            </div>
                            :
                            <button className="buttonServer unselectable" onClick={this.addingUser}>Add user</button>
                    }
                    <button className="buttonServer unselectable" onClick={this.props.switchSettings}>Server settings</button>
                </div>
                <hr className="serverhr" />
                <div id="serverChannels" className="row">
                    <div className="channelsContainer container scrollableServer unselectable">
                        {channelComponents}
                        <div className="row full-width">
                            <div className={this.state.channelCreation ? "d-none" : "full-width"}>
                                <button className="addUserInServerButton" onClick={this.showChannelCreation}>Add a channel</button>
                            </div>
                            <div className={!this.state.channelCreation ? "d-none" : ""}>
                                <div className="input-group addUserInServerInput">
                                    <input ref={this.channelInputRef} onKeyPress={this._handleKeyPress} type="text" className="form-control addUserInServerName" placeholder="Channel name" aria-label="Channel name" aria-describedby="basic-addon2" />
                                    <div className="input-group-append addUserInServerAdd">
                                        <button onClick={this.addChannel} className="btn btn-primary addUserInServerAddButton" type="button">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="serverhr" />
                <div className="serverUsers row">
                    {
                        users
                    }
                </div>
            </div>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        channels: state.channel.channels.filter(c => c.serverId === state.server.activeServerId),
        ws: state.ws.ws,
        username: state.auth.username,
        activeChannelId: state.channel.activeChannelId,
        serverId: state.server.activeServerId,
        server: state.server.servers.filter(s => s.id === state.server.activeServerId)[0],
        allUsers: state.contact.users.filter(
            u => {
                return u.servers.length === u.servers.filter(
                    s => {
                        return s.id !== state.server.activeServerId;
                    }
                ).length;
            }
        ),
        images: state.contact.images
    }
}

const mapsDispatchToPros = {
    getAllUsers,
    selectChannel,
    requestAddUser,
    requestMessageList,
    requestCreateChannel,
}

export default connect(mapsStateToProps, mapsDispatchToPros)(ServerInfos); 
