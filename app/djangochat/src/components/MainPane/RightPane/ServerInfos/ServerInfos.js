import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr'

import './ServerInfos.css';
import Channel from './Channel/Channel';

import { selectChannel, requestCreateChannel,_createChannel } from "../../../../actions/ChannelAction";
import { requestMessageList } from "../../../../actions/MessageAction";

import Autocomplete from "../Autocomplete/Autocomplete";
import { getAllUsers } from "../../../../actions/ContactAction";
import { requestAddUser,_addUser } from "../../../../actions/ServerAction";

class ServerInfos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            channelCreation: false,
            addingUser: false,
            defaultChannelSelected: false,
            userUpdateListenerAdded:false
        };

        this.newUserInput = React.createRef();
        this.channelInputRef = React.createRef();
    }


    channelSelected = (id) => {
        this.props.selectChannel(id, true);
        this.props.requestMessageList(id).catch(()=>{
            toastr.error("Error","Impossible to retrieve message list")
        });;
    };

    addingUser = () => {
        this.props.getAllUsers();
        this.setState({
            addingUser: true
        });
    };

    addUser = () => {
        if (this.newUserInput.state.userInput !== "" && this.props.allUsers.filter(u => {
            return u.username === this.newUserInput.state.userInput
        }).length > 0) {
            let user_id = this.props.allUsers.filter(u => {
                return u.username === this.newUserInput.state.userInput
            })[0].id;

            this.props.requestAddUser(user_id, this.props.serverId).catch(()=>{
                toastr.error("Error", "Impossible to add a user.")
            });
            this.props.ws.send(JSON.stringify({
                notification: {
                    user_id: user_id,
                    text: `${this.props.username} added you to server "${this.props.server.name}"`,
                    title: 'Added to server',
                    type: 'server'
                }
            }));


        }
        this.setState({
            addingUser: false
        });
    }

    componentDidUpdate() {
        if (this.props.ws != null && this.props.ws.readyState === WebSocket.OPEN && !this.state.userUpdateListenerAdded){
            this.props.ws.addEventListener('userAdded',actionData=>{
                this.props._addUser(actionData.detail);
                console.log(actionData)
            });
            this.props.ws.addEventListener('channelCreated',actionData=>{
                this.props._createChannel(actionData.detail.channel);
            });
            this.setState({userUpdateListenerAdded:true});
        }
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
                if(this.serverInputRef !== undefined){
                    this.serverInputRef.current.value = '';
                }
                toastr.success("Success", "Channel successfuly created");
            }).catch((err) => {
                console.log(err)
                toastr.error("Error", "Impossible to create a channel");
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
            let serverUsers
            if(this.props.server.hasOwnProperty('userSet')){
                serverUsers=this.props.server.userSet.map(u => {
                    let image = this.props.images[u.id] === '' ? require('../images/profile.png') : this.props.images[u.id];
                    return (<div className="col-3" key={u.id}>
                        <img className="image-profile2" src={image} alt={u.username} />
                    </div>);
                });
            }
            
            return (
                <div id="serverContainer" className="container">
                    <div className="serverButtons row">
                    {
                        this.state.addingUser ?
                            <div className="input-group addUserInServer">
                                <Autocomplete className="autocomplete-server" ref={(newUserInput) => { this.newUserInput = newUserInput; }}
                                    suggestions={this.props.allUsers.map(u => {
                                        return u.username
                                    })}
                                />
                                <div className="input-group-append addUserInServerAdd">
                                    <button onClick={this.addUser} className="btn btn-primary addUserInServerAddButton" type="button">Add</button>
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
                                <button className="addChannelInServerButton" onClick={this.showChannelCreation}>Add a channel</button>
                            </div>
                            <div className={!this.state.channelCreation ? "d-none" : ""}>
                                <div className="input-group addChannelInServerInput">
                                    <input ref={this.channelInputRef} onKeyPress={this._handleKeyPress} type="text" className="form-control addChannelInServerName" placeholder="Channel name" aria-label="Channel name" aria-describedby="basic-addon2" />
                                    <div className="input-group-append addChannelInServerAdd">
                                        <button onClick={this.addChannel} className="btn btn-primary addChannelInServerAddButton" type="button">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="serverhr" />
                <div className="serverUsers row">
                    {serverUsers}
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
        images: state.contact.images,
    }
}

const mapsDispatchToPros = {
    getAllUsers,
    selectChannel,
    requestAddUser,
    requestMessageList,
    requestCreateChannel,
    _addUser,
    _createChannel
}

export default connect(mapsStateToProps, mapsDispatchToPros)(ServerInfos); 
