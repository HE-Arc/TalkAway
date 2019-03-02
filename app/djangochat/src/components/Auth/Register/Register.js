import React from 'react';

class Register extends React.Component {
    state = {
        email: '',
        username: '',
        password: '',
        passwordCheck: '',
        errors: {}
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }
    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }
    handlePasswordCheckChange(e) {
        this.setState({passwordCheck: e.target.value});
    }

    handleValidation() {
        const {email, username, password, passwordCheck} = this.state;

        let errors = {};
        let formIsValid = true;

        //Username
        if (!username) {
            formIsValid = false;
            errors["username"] = "Cannot be empty";
        }

        if (typeof username !== "undefined") {
            if (!username.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["username"] = "Only letters";
            }
        }

        //Email
        if (!email) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (email !== "undefined") {
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        //Password
        if (!password) {
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

    submit(event) {
        event.preventDefault();

        if (this.handleValidation()) {
            console.log("TODO register");
        }
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
                    value={this.state.email}
                    onChange={this
                    .handleEmailChange
                    .bind(this)}/>
                <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                <label htmlFor="inputUsername" className="sr-only">Username</label>
                <input
                    type="text"
                    id="inputUsername"
                    className="form-control"
                    placeholder="Username"
                    required
                    value={this.state.username}
                    onChange={this
                    .handleUsernameChange
                    .bind(this)}/>
                <span style={{color: "red"}}>{this.state.errors["username"]}</span>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                    value={this.state.password}
                    onChange={this
                    .handlePasswordChange
                    .bind(this)}/>
                <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                <label htmlFor="inputPasswordCheck" className="sr-only">Password confirmation</label>
                <input
                    type="password"
                    id="inputPasswordCheck"
                    className="form-control last"
                    placeholder="Password confirmation"
                    required
                    value={this.state.passwordCheck}
                    onChange={this
                    .handlePasswordCheckChange
                    .bind(this)}/>
                <span style={{color: "red"}}>{this.state.errors["passwordCheck"]}</span>
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

                <button
                    className="btn btn-lg btn-primary btn-block"
                    onClick={this
                    .submit
                    .bind(this)}>Register</button>
            </React.Fragment>
        );
    }
}

export default Register;
