import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
        <form onSubmit={this.submitHandler}>
            <div className="form-control">
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" ref={this.emailref} />
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
