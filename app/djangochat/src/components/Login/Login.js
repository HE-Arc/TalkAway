import React, { Component } from 'react';

class Login extends Component {
    
    state = {
        login: true, // switch between Login and SignUp
        email: '',
        password: '',
        name: '',
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <form onSubmit={this.submitHandler}>
            <div className="form-control">
                <label htmlFor="username">Username</label>
                <input type="username" id="username" ref={this.emailref} />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordEl} />
            </div>
        </form>
        );
    }
}

export default Login; 
