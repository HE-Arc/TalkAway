import React, { Component } from 'react';

class AuthPage extends Component {

    styte = {
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

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        //TODO validation

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        // verify_token = graphql_jwt.Verify.Field()
        // refresh_token = graphql_jwt.Refresh.Field()

        let requestBody = {
            query: `
            mutation {
                tokenAuth(username: "${email}", password: "${password}") {
                    token
                }
            }
            `
        }

        if (this.isLogin){
            requestBody = {
                query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}"}){
                        id
                        email
                    }
                }
                `
            };
        }

        //console.log(email, password);
        fetch("https://localhost:8080/graphql", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

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
            <div className="form-actions">
                <button type="submit">Login</button>
                <button type="button">Switch to {this.state.isLogin ? 'Signup' : 'Login'}</button>
            </div>
        </form>
        );
    }
}

export default AuthPage;