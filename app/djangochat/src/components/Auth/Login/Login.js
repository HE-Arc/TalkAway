import React from 'react';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    submit = (event) => {
        event.preventDefault();

        const password = this.usernameRef.current.value;
        const username = this.passwordRef.current.value;

        if (username.trim().length === 0 || password.trim().length === 0) {
            return; //TODO warning
        }

        console.log(username, password);

        const requestBody = {
            query: `
            mutation {
                tokenAuth(username: "${username}", password: "${password}") {
                    token
                }
              }
            `
        };

        fetch('http://localhost:8080/graphql/', {
            method: 'POST',
            body: JSON.stringify(requestBody),  // JSON Object 
            headers : { 
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            if(res.status !== 200 && res.status !== 201){
                throw new Error('Failed')
            }
            return res.json();
        }).then(resData => {
            console.log(resData);
            //TODO get token
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
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
                    ref={this.usernameRef}/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control last"
                    placeholder="Password"
                    required
                    ref={this.passwordRef}/> {/* <label htmlFor="username">Username</label>
            <div className="form-control">
                <input type="username" id="username"/>
            </div>
            <label htmlFor="password">Password</label>
            <div className="form-control">
                <input type="password" id="password"/>
            </div> */}
                <button className="btn btn-lg btn-primary btn-block" onClick={this.submit}>Log in</button>
            </React.Fragment>
        );
    }
};

export default Login;