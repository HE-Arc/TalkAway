import React from 'react';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
    }

    submit(event) {
        event.preventDefault();

        if(this.state.username && this.state.password){
            console.log("submit login")
            //TODO send login action
        }
    }

    handleUsernameChange(e) {
        this.setState({ 'username': e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ 'password': e.target.value });
    }

    render(){
        return (
        <React.Fragment>
            <h1 className="h3 mb-3 font-weight-normal">Welcome back!</h1>

            <label htmlFor="inputUsername" className="sr-only">Username</label>
            <input
                type="text"
                id="inputUsername"
                className="form-control first"
                placeholder="Username"
                required
                autoFocus
                value={this.state.username}
                onChange={this.handleUsernameChange.bind(this)}/>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input
                type="password"
                id="inputPassword"
                className="form-control last"
                placeholder="Password"
                required
                value={this.state.password}
                onChange={this.handlePasswordChange.bind(this)}/>
            {/* <label htmlFor="username">Username</label>
            <div className="form-control">
                <input type="username" id="username"/>
            </div>
            <label htmlFor="password">Password</label>
            <div className="form-control">
                <input type="password" id="password"/>
            </div> */}
            <button className="btn btn-lg btn-primary btn-block" onClick={this.submit.bind(this)}>Log in</button>
        </React.Fragment>
        );
    }
};

export default Login;