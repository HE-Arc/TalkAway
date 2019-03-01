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
                <div className="text-center">
                    <form className="form-signin">
                        <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                        <div className="checkbox mb-3">
                            <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
                    </form>
                </div>
            </div>
        );
    }
}
export default AuthPage;


