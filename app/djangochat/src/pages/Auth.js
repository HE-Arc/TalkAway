import React, { Component } from 'react';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';

class AuthPage extends Component {

    state = {
        isLogin: true
    }

    constructor(props)
    {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin}
        });
    }

    render() {
        let authComponent;
    
        if (this.state.isLogin) {
            authComponent = <Login/>;
        } else {
            authComponent = <Register />;
        }

        return (
            <div>
                {authComponent}
                <div className="form-actions">
                    <button type="submit">Login</button>
                    <button type="button" onClick={this.switchModeHandler}>Switch to {this.state.isLogin ? 'Signup' : 'Login'}</button>
                </div>
            </div>
        );
    }
}
export default AuthPage;