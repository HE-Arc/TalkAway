import React, { Component } from 'react';

class Register extends Component {
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

export default Register; 
