import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import ImageEditor from '../../../Global/ImageEditor';
import './ServerSettings.css';

import { requestEditServer } from "../../../../actions/ServerAction";

class ServerSettings extends Component {

    constructor(props) {
        super(props)
        this.refEditor = React.createRef();
    }

    save = () => {
        const server = this.props.activeServer[0]

        const image = this.refEditor.current.getData();
        
        const name = server.name;
        const userAddingRight = 1;
        this.props.requestEditServer(server.id, name, image, userAddingRight).catch(() => {
            toastr.error("Error", "Impossible to save your settings")
        });
    }

    render() {
        const server = this.props.activeServer[0]

        return (
            <div className="container unselectable">

                <button id="close-settings" type="button" className="close close-settings" onClick={this.props.switchSettings}>
                    &times;
                </button>

                <div className="row contentServerSettings">
                    <div className="serverNameSettings">
                        {this.props.activeServer[0] !== undefined ? server.name : ""}
                    </div>
                </div>
                <div className="row">
                    <ImageEditor className="imageEditorServer" ref={this.refEditor} id={server.id} image={server.image}></ImageEditor>
                </div>
                <div className="row">
                    <input className="saveButton" type="button" value="Save" onClick={this.save} />
                </div>
            </div>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        activeServer: state.server.servers.filter(s => s.id === state.server.activeServerId)
    }
}

export default connect(mapsStateToProps, { requestEditServer })(ServerSettings);
