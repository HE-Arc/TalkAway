import React, { useState, useContext } from 'react';

import Register from '../components/Auth/Register/Register';
import Login from '../components/Auth/Login/Login';
import "./Auth.css";

const AuthPage = props => {

    const [isLogin, setIsLogin] = useState(true);

    const switchModeHandler = () => {
        setIsLogin(!isLogin);
    }

    let authComponent;

    if (isLogin) {
        authComponent = <Login/>;
    } else {
        authComponent = <Register />;
    }

    return (
        <div className="text-center">
            <form className="form-signin">
                <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="TODO Logo" width="72" height="72"/>
                
                {authComponent}
                
                <button type="button" onClick={switchModeHandler} className="btn btn-link mt-2">{isLogin ? 'No account ? Register here' : 'Already have an account ? Log in here'}</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
            </form>
        </div>
    );
}

export default AuthPage;


/* <div className="form-control">
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
</div> */

/* <div className="form-control">
<label htmlFor="username">Username</label>
<input type="username" id="username" ref={this.emailref} />
</div>
<div className="form-control">
<label htmlFor="password">Password</label>
<input type="password" id="password" ref={this.passwordEl} />
</div> */


