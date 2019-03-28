import React, { Component } from 'react';

import {connect} from 'react-redux';

class UserSettings extends Component {
    
    render() {
        // Find appropriate state image
        let connectionImg;

        // Return the component
        return (
            <div className="container" style={{paddingTop: '10px', height: '100%'}}>
                <div className="row contactSelector unselectable" style={{marginBottom: '20px'}}>
                    <button onClick={this.props.closeSettings}>Close</button>
                    {/* TODO MODIFIER AVEC UNE CROIX */}

                    <div className="col-12" onClick={this.displayServers}>
                        TODO ADD Settings fields and actions
                    </div>
                </div>
            </div>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapsStateToProps)(UserSettings); 
