import React, { Component } from 'react';

import {connect} from 'react-redux';

class UserSettings extends Component {
    
    render() {
        // Return the component
        return (
            <div className="container" style={{paddingTop: '10px', height: '100%'}}>
                <div className="row contactSelector unselectable" style={{marginBottom: '20px'}}>
                    <div className="col-12">
                        <div className="ml-auto mb-4 text-right text-white">
                            <button type="button" className="close text-right text-white" onClick={this.props.switchSettings}>
                                <span>&times;</span>
                            </button>
                        </div>
                    </div>

                    
                    <div className="mx-auto text-center">
                        <h2 className="">
                            TODO Image
                        </h2>
                        <h2 className="">
                            {this.props.auth.username}
                        </h2>
                    </div>

                    <hr className="mt-6 mb-6 col-12 text-white border-white" />

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
