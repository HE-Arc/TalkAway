import React, {useState, useEffect} from 'react';

const Login = props => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        console.log("mounted")
    }, []);

    const submit = (event) => {
        event.preventDefault();

        if(username && password){
            console.log("submit login")
            //TODO send login action
        }
    };

    let content = (
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
                value={username}
                onChange={value=>setUsername(value.target.value)}/>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input
                type="password"
                id="inputPassword"
                className="form-control last"
                placeholder="Password"
                required
                value={password}
                onChange={value=>setPassword(value.target.value)}/>
            {/* <label htmlFor="username">Username</label>
            <div className="form-control">
                <input type="username" id="username"/>
            </div>
            <label htmlFor="password">Password</label>
            <div className="form-control">
                <input type="password" id="password"/>
            </div> */}
            <button className="btn btn-lg btn-primary btn-block" onClick={submit}>Log in</button>
        </React.Fragment>
    );
    return content;
};

export default Login;