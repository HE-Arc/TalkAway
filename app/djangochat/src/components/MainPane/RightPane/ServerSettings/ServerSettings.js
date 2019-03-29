import React, { Component } from 'react';
import {connect} from 'react-redux';

// import './ServerProfile.css';

class ServerSettings extends Component {

    render() {
        // Return the component
        return (
            <div className="container unselectable">
                <div id="rowProfile" className="row">
                    <div id="image" className="col-3">
                        {/* <img alt="" src={require('./images/profile.png')} width="70" height="70"/> */}
                    </div>
                    <div id="servername" className="col-9">
                        {this.props.activeServer[0]!==undefined ? this.props.activeServer[0].name:""}
                    </div>
                    <button onClick={this.props.switchSettings}>Close</button>
                    <p>TODO</p>
                </div>
            </div>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        activeServer: state.server.servers.filter(s=>s.id===state.server.activeServerId)
    }
}

export default connect(mapsStateToProps)(ServerSettings);
