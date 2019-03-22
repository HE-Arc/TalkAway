import React from 'react';
import {connect} from 'react-redux';

import {requestLogin} from "../../../actions/AuthAction";
import '../Auth.css';

class Login extends React.Component {
    state = {
        errors : null,
        shakingError : false
    }

    constructor(props) {
        super(props);
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    showError = () => {
        this.setState({
            errors: 'Invalid credentials',
            shakingError: true
        });
        setTimeout(()=>{
            this.setState({
                shakingError: false
            })
        }, 500);
    }

    submit = (event) => {
        event.preventDefault();

        const username = this.usernameRef.current.value;
        const password = this.passwordRef.current.value;

        if (username.trim().length === 0 || password.trim().length === 0) {
            this.showError();
            return;
        }

        console.log("Request login");
        this
            .props
            .requestLogin(username, password)
            .catch((error)=>{
                this.showError();
            });
    }

    render() {
        return (
            <React.Fragment>
                <h1 className="h3 mb-3 font-weight-normal">Welcome back!</h1>

                <div className={this.state.shakingError ? 'ahashakeheartache':''}>
                    <span style={{
                        color: "red"
                    }}>{this.state.errors}</span>
                </div>
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
                    ref={this.passwordRef}/>
                <button className="btn btn-lg btn-primary btn-block" onClick={this.submit}>Log in</button>
            </React.Fragment>
        );
    }
};

export default connect(null, {requestLogin})(Login);