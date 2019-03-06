import React from 'react';
import {connect} from 'react-redux';

import {requestLogin} from "../../../actions/AuthAction";

class Login extends React.Component {
    state = {
        errors : null
    }

    constructor(props) {
        super(props);
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    submit = (event) => {
        event.preventDefault();

        const password = this.usernameRef.current.value;
        const username = this.passwordRef.current.value;

        if (username.trim().length === 0 || password.trim().length === 0) {
            this.setState({
                errors: 'Invalid credentials'
            })
            return;
        }

        console.log("Request login");
        this
            .props
            .requestLogin(username, password);
    }

    render() {
        return (
            <React.Fragment>
                <h1 className="h3 mb-3 font-weight-normal">Welcome back!</h1>

                <span style={{
                    color: "red"
                }}>{this.state.errors}</span>
                <label htmlFor="inputUsername" className="sr-only">Username</label>
                <input
                    type="text"
                    id="inputUsername"
                    className="form-control first"
                    placeholder="Username"
                    required
                    autoFocus
                    ref={this.usernameRef}/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control last"
                    placeholder="Password"
                    required
                    ref={this.passwordRef}/> {/* <label htmlFor="username">Username</label>
            <div className="form-control">
                <input type="username" id="username"/>
            </div>
            <label htmlFor="password">Password</label>
            <div className="form-control">
                <input type="password" id="password"/>
            </div> */}
                <button className="btn btn-lg btn-primary btn-block" onClick={this.submit}>Log in</button>
            </React.Fragment>
        );
    }
};

export default connect(null, {requestLogin})(Login);