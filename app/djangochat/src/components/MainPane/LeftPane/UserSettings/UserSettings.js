import React, { Component } from 'react';
import {connect} from 'react-redux';
import './UserSettings.css';

import {logout,requestEditUser} from "../../../../actions/AuthAction";

class UserSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            oldPassword: '',
            newPassword: '',
            newPassword2: ''
        };
    }
    
    save = () => {
        if(this.state.newPassword===this.state.newPassword2 && this.state.oldPassword!==''){
            let ok=this.props.requestEditUser(this.state.mail,this.state.newPassword2,this.state.newPassword,this.state.oldPassword);

            if(ok){
                this.setState({
                    mail: '',
                    oldPassword: '',
                    newPassword: '',
                    newPassword2: ''
                });
            }
        }
    }

    render() {
        // Return the component
        return (
            <div>
                <div>
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


                    <label id="email-label" htmlFor="email" >Email</label>
                    <input type="email" value={this.state.mail} id="email" onChange={(evt) => { this.setState({mail:evt.target.value}); }} required></input>

                    <label id="old-password-label" htmlFor="old-password" >Old password</label>
                    <input type="password" value={this.state.oldPassword} id="old-password" onChange={(evt) => { this.setState({oldPassword:evt.target.value}); }}  name="old-password" required></input>

                    <label id="new-password-label" htmlFor="new-password" >New password</label>
                    <input type="password" value={this.state.newPassword} id="new-password" onChange={(evt) => { this.setState({newPassword:evt.target.value}); }} name="new-password" required></input>

                    <label id="repeat-password-label" htmlFor="repeat-password" >Repeat your password</label>
                    <input type="password" id="repeat-password" value={this.state.newPassword2} onChange={(evt) => { this.setState({newPassword2:evt.target.value}); }} name="repeat-password" required></input>

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

export default connect(mapsStateToProps, {logout,requestEditUser})(UserSettings); 
