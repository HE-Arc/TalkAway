import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import ImageEditor from '../../../Global/ImageEditor';

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

        let imageServer;
        if (server !== undefined && server.image !== '') {
            imageServer = this.props.activeServer[0].image;
        }
        else {
            imageServer = require('../images/profile.png');
        }
        return (
            <div className="container unselectable">

                <button id="close-settings" type="button" className="close" onClick={this.props.switchSettings}>
                    &times;
                </button>

                <div className="rowProfile mx-auto text-center">
                    <div className="image col-3">
                        <img alt="" src={imageServer} width="70" height="70" />
                    </div>
                    <div className="servername col-9">
                        {server.name}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-3">
                        <ImageEditor ref={this.refEditor} id={server.id} image={server.image}></ImageEditor>
                        <input className="saveButton" type="button" value="Save" onClick={this.save} />
                    </div>
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
