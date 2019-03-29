import React, { Component } from 'react';

import {connect} from 'react-redux';

class UserSettings extends Component {
    
    save = () => {
        console.log("TODO SAVE in UserSettings Component")
    }

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
                    <input type="email" placeholder="Email" required></input>
                    <label htmlFor="old-password" >Old password</label>
                    <input type="password" id="old-password" name="old-password" placeholder="Old password" required></input>

                    <label htmlFor="new-password" >New password</label>
                    <input type="password" id="new-password" name="new-password" placeholder="New password" required></input>

                    <label htmlFor="repeat-password" >Repeat your password</label>
                    <input type="password" id="repeat-password" name="repeat-password" placeholder="Repeat new password" required></input>

                    <input type="button" value="Save" onClick={this.save}/>
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
