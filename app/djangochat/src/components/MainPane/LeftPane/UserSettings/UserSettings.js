import React, { Component } from 'react';
import {connect} from 'react-redux';
import './UserSettings.css';

import {logout, requestEditProfile} from "../../../../actions/AuthAction";
import ImageEditor from "../../../Global/ImageEditor";

class UserSettings extends Component {
    
    save = () => {
        const image = this.refEditor.current.getData();
        
        this.props.requestEditProfile(image);
    }

    render() {
        // Return the component
        return (
            <div className="container-fluid">
                <button id="close-settings" type="button" className="close" onClick={this.props.switchSettings}>
                    &times;
                </button>
                
                <div className="mx-auto text-center">
                    <h3 id="todo-image" className="">
                        Image
                    </h3>
                    <h3 id="settings-username" className="">
                        {this.props.auth.username}
                    </h3>
                </div>

                <hr id="settings-separator" className="text-white border-white" />

                <div className="row">
                    <button onClick={this.save}>Save image</button>
                    <ImageEditor ref={this.refEditor} id={this.props.auth.id} image={this.props.auth.image}></ImageEditor>
                </div>

                <div className="row">
                    <label id="email-label" htmlFor="email" >Email</label>
                    <input type="email" id="email" required></input>

                    <label id="old-password-label" htmlFor="old-password" >Old password</label>
                    <input type="password" id="old-password" name="old-password" required></input>

                    <label id="new-password-label" htmlFor="new-password" >New password</label>
                    <input type="password" id="new-password" name="new-password" required></input>

                    <label id="repeat-password-label" htmlFor="repeat-password" >Repeat your password</label>
                    <input type="passwordConfirmation" id="repeat-password" name="repeat-password" required></input>

                    <input id="saveButton" type="button" value="Save" onClick={this.save}/>
                    <input id="disconnectButton" type="button" value="Disconnect" onClick={this.props.logout}/>
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

export default connect(mapsStateToProps, {logout, requestEditProfile})(UserSettings); 
