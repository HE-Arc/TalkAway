import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ServerInfos.css';
import Channel from './Channel/Channel';

import { selectChannel, requestCreateChannel } from "../../../../actions/ChannelAction";
import { requestMessageList } from "../../../../actions/MessageAction";
import Autocomplete from "../Autocomplete/Autocomplete";

class ServerInfos extends Component {

    

    constructor(props){
        super(props);

        this.state = {
            channelCreation: false,
            addingUser:false
        };

        this.channelInputRef = React.createRef();
    }

    channelSelected = (id) => {
        this.props.selectChannel(id);
        this.props.requestMessageList(id);
    };

    addUser = () => {
        this.setState({
            addingUser:true
        });
    };

    showChannelCreation = () => {
        this.setState({
            channelCreation: true
        },
        ()=>{
            this.channelInputRef.current.focus();
        })
    };

    addChannel = () => {
        let channelName = String(this.channelInputRef.current.value);
        if(channelName === ""){
            return;
        }

        this.props.requestCreateChannel(this.props.serverId, String(this.channelInputRef.current.value))
        .then(()=>{
            this.setState({
                channelCreation: false
            })
            this.channelInputRef.current.value = '';
        }).catch((err)=>{
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
                const channelId = Number(channel.id);
                let classes = ["row"];
                if (channelId === this.props.activeChannelId) {
                    classes.push("selected");
                } else {
                    classes.push("selectable");
                }
                return (<div key={channel.id} className={classes.join(' ')}>
                    <Channel name={channel.name} channelSelected={this.channelSelected} idChannel={channel.id} />
                </div>);
            });
        
            return (
                <div id="serverContainer" className="container">
                    <div id="serverButtons" className="row">
                    {
                    this.state.addingUser ?
                    <Autocomplete
                    suggestions={[
                    "Alligator",
                    "Bask",
                    "Crocodilian",
                    "Death Roll",
                    "Eggs",
                    "Jaws",
                    "Reptile",
                    "Solitary",
                    "Tail",
                    "Wetlands"
                    ]}
                />
                    :
                        <button className="buttonServer unselectable" onClick={this.addUser}>Add user</button>
                    }
                        <button className="buttonServer unselectable" onClick={this.props.switchSettings}>Server settings</button>
                    </div>
                    <hr className="serverhr" />
                    <div id="serverChannels" className="row">
                        <div id="channelsContainer" className="container scrollableServer unselectable">
                            {channelComponents}
                            <div className="row mt-3">
                                <div className={this.state.channelCreation?"d-none":""}>
                                    <button onClick={this.showChannelCreation}>Add a channel</button>
                                </div>
                                <div className={!this.state.channelCreation?"d-none":""}>
                                    <div className="input-group mb-3">
                                        <input ref={this.channelInputRef} onKeyPress={this._handleKeyPress} type="text" className="form-control" placeholder="Channel name" aria-label="Channel name" aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <button onClick={this.addChannel} className="btn btn-primary" type="button">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="serverhr" />
                    <div id="serverUsers" className="row">
                        {/* TODO Add user section */}
                    </div>
                </div>
            );
        }
    }

const mapsStateToProps = (state) => {
    return {
        channels: state.channel.channels.filter(c => c.serverId === state.server.activeServerId),
        activeChannelId: state.channel.activeChannelId,
        serverId: state.server.activeServerId
    }
}

export default connect(mapsStateToProps, { selectChannel, requestCreateChannel, requestMessageList })(ServerInfos); 
