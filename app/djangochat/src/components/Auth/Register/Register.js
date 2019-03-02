import React, {useState} from 'react';

const Register = props => {
    const [email,
        setEmail] = useState('');
    const [username,
        setUsername] = useState('');
    const [password,
        setPassword] = useState('');
    const [passwordCheck,
        setPasswordCheck] = useState('');

    const submit = (event) => {
        event.preventDefault();
        
        if (email && username && password && password === passwordCheck) {
            console.log("TODO register");

        }
    };

    let content = (
        <React.Fragment>
            <h1 className="h3 mb-3 font-weight-normal">Register!</h1>

            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input
                type="email"
                id="inputEmail"
                className="form-control first"
                placeholder="Email address"
                required
                autoFocus
                value={email}
                onChange={value => setEmail(value.target.value)}/>
            <label htmlFor="inputUsername" className="sr-only">Username</label>
            <input
                type="text"
                id="inputUsername"
                className="form-control"
                placeholder="Username"
                required
                value={username}
                onChange={value => setUsername(value.target.value)}/>
            <label htmlFor="inputPasswordCheck" className="sr-only">Password</label>
            <input
                type="password"
                id="inputPasswordCheck"
                className="form-control"
                placeholder="Password"
                required
                value={password}
                onChange={value => setPassword(value.target.value)}/>
            <label htmlFor="inputPassword" className="sr-only">Password confirmation</label>
            <input
                type="password"
                id="inputPassword"
                className="form-control last"
                placeholder="Password confirmation"
                required
                value={passwordCheck}
                onChange={value => setPasswordCheck(value.target.value)}/>
            {/* <div className="form-control">
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email"/>
            </div>
            <div className="form-control">
                <label htmlFor="username">Username</label>
                <input type="text" id="username"/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password"/>
            </div>
            <div className="form-control">
                <label htmlFor="password-confirm">Password confirmation</label>
                <input type="password" id="password-confirm"/>
            </div> */}

            <button className="btn btn-lg btn-primary btn-block" onClick={submit}>Register</button>
        </React.Fragment>
    );
    return content;
};

export default Register;
