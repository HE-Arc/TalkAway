import React, { Component } from 'react';

class Register extends Component {
    
    constructor(props) {
        super(props);

        this.emailRef = React.createRef();
    }

    submitHandler() {
        //TODO Check input
        
    }

    render() {
        return (
        <form onSubmit={this.submitHandler}>
            <div className="form-control">
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" ref={this.emailref} />
            </div>
            <div className="form-control">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" ref={this.emailref} />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordEl} />
            </div>
            <div className="form-control">
                <label htmlFor="password-confirm">Password confirmation</label>
                <input type="password" id="password-confirm" ref={this.passwordEl} />
            </div>
        </form>
        );
    }
}

export default Register; 
