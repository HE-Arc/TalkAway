import React from 'react';
import {connect} from 'react-redux';

import {requestRegister} from "../../../actions/AuthAction";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.usernameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordCheckRef = React.createRef();
    }
    state = {
        errors: {}
    }

    handleValidation() {
        const email = this.emailRef.current.value;
        const username = this.usernameRef.current.value;
        const password = this.passwordRef.current.value;
        const passwordCheck = this.passwordCheckRef.current.value;

        let errors = {};
        let formIsValid = true;

        //Username
        if (username.trim().length === 0) {
            formIsValid = false;
            errors["username"] = "Cannot be empty";
        } else {
            if (!username.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["username"] = "Only letters";
            }
        }

        //Email
        if (email.trim().length === 0) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        } else {
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        //Password
        if (password.trim().length === 0) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        if (typeof password !== "undefined") {
            if (password.length < 8) {
                formIsValid = false;
                errors["password"] = "Min 8 characters";
            }
        }

        if (password !== passwordCheck) {
            formIsValid = false;
            errors["passwordCheck"] = "Not identical to password";
        }

        this.setState({errors: errors});

        return formIsValid;
    }

    submit = (event) => {
        event.preventDefault();

        if (!this.handleValidation()) {
            return;
        }

        const email = this.emailRef.current.value;
        const username = this.usernameRef.current.value;
        const password = this.passwordRef.current.value;

        this
            .props
            .requestRegister(email, username, password)
    }

    render() {
        return (
            <React.Fragment>
                <h1 className="h3 mb-3 font-weight-normal">Register!</h1>

                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input
                    type="email"
                    id="inputEmail"
                    className="form-control first"
                    placeholder="Email address"
                    required
                    autoFocus
                    ref={this.emailRef}/>
                <span style={{
                    color: "red"
                }}>{this.state.errors["email"]}</span>
                <label htmlFor="inputUsername" className="sr-only">Username</label>
                <input
                    type="text"
                    id="inputUsername"
                    className="form-control"
                    placeholder="Username"
                    required
                    ref={this.usernameRef}/>
                <span style={{
                    color: "red"
                }}>{this.state.errors["username"]}</span>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                    ref={this.passwordRef}/>
                <span style={{
                    color: "red"
                }}>{this.state.errors["password"]}</span>
                <label htmlFor="inputPasswordCheck" className="sr-only">Password confirmation</label>
                <input
                    type="password"
                    id="inputPasswordCheck"
                    className="form-control last"
                    placeholder="Password confirmation"
                    required
                    ref={this.passwordCheckRef}/>
                <span style={{
                    color: "red"
                }}>{this.state.errors["passwordCheck"]}</span>

                {/* <div className="form-control">
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email"/>
            </div>
            <div className="form-control">
                <label htmlFor="username">Username</label>
                <input type="text" id="username"/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password"/>
            </div>
            <div className="form-control">
                <label htmlFor="password-confirm">Password confirmation</label>
                <input type="password" id="password-confirm"/>
            </div> */}

                <button className="btn btn-lg btn-primary btn-block" onClick={this.submit}>Register</button>
            </React.Fragment>
        );
    }
}

export default connect(null, {requestRegister})(Register);
