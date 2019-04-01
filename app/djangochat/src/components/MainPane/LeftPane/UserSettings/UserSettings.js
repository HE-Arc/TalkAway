import React, { Component } from 'react';
import {connect} from 'react-redux';
import './UserSettings.css';

import {logout, requestEditUser} from "../../../../actions/AuthAction";
import ImageEditor from "../../../Global/ImageEditor";

class UserSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            oldPassword: '',
            newPassword: '',
            newPassword2: ''
        };

        this.refEditor=React.createRef();
    }
    
    save = () => {
        if(this.state.newPassword===this.state.newPassword2 && this.state.oldPassword!==''){
            const image = this.refEditor.current.getData();
            let ok=this.props.requestEditUser(this.state.mail,this.state.newPassword2,this.state.newPassword,this.state.oldPassword,image);

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
            <div className="container-fluid">
                <button className="close-settings close" type="button" onClick={this.props.switchSettings}>
                    &times;
                </button>
                
                <div className="mx-auto text-center">
                    <h3 className="todo-image">
                        Image
                    </h3>
                    <h3 className="settings-username">
                        {this.props.auth.username}
                    </h3>
                </div>

                <hr className="settings-separator text-white border-white"/>

                <div className="row">
                    <ImageEditor ref={this.refEditor} id={this.props.auth.id} image={this.props.auth.image}></ImageEditor>
                </div>

                <div className="row">
                    <label className="email-label" htmlFor="email" >Email</label>
                    <input type="email" value={this.state.mail} className="email" onChange={(evt) => { this.setState({mail:evt.target.value}); }} required></input>

                    <label className="old-password-label" htmlFor="old-password" >Old password</label>
                    <input type="password" value={this.state.oldPassword} className="old-password" onChange={(evt) => { this.setState({oldPassword:evt.target.value}); }}  name="old-password" required></input>

                    <label className="new-password-label" htmlFor="new-password" >New password</label>
                    <input type="password" value={this.state.newPassword} className="new-password" onChange={(evt) => { this.setState({newPassword:evt.target.value}); }} name="new-password" required></input>

                    <label className="repeat-password-label" htmlFor="repeat-password" >Repeat your password</label>
                    <input type="password" className="repeat-password" value={this.state.newPassword2} onChange={(evt) => { this.setState({newPassword2:evt.target.value}); }} name="repeat-password" required></input>

                    <input className="saveButton" type="button" value="Save" onClick={this.save}/>
                    <input className="disconnectButton" type="button" value="Disconnect" onClick={this.props.logout}/>
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

export default connect(mapsStateToProps, {logout, requestEditUser})(UserSettings); 
