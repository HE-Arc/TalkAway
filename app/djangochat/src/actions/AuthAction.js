export function logout() {
    return dispatch => {
        dispatch(
            _logout()
        );
    }
}

export function requestLogin(username, password) {
    return dispatch => {
        const requestBody = {
            query: `
            mutation {
                tokenAuth(username: "${username}", password: "${password}") {
                    token
                }
              }
            `
        };

        return fetch('http://localhost:8080/graphql/', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        }).then(resData => {
            const response = {
                token: resData.data.tokenAuth.token,
                username: username,
                isLogged: true
            }
            
            dispatch(_login(response));
        }).catch(err => {
            console.log(err);
        });
    }
}

export function requestRegister(email, username, password) {
    return dispatch => {
        const requestBody = {
            query: `
            mutation {
                createUser(username:"${username}", password:"${password}", email:"${email}") {
                  user {
                    username
                  }
                }
              }
            `
        };

        fetch('http://localhost:8080/graphql/', {
            method: 'POST',
            body: JSON.stringify(requestBody), // JSON Object
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        }).then(resData => {
            dispatch(requestLogin(username, password));
        }).catch(err => {
            console.log(err);
        })
    }
}

function _logout() {
    return {
        type: 'LOGOUT',
        payload: null
    }
}

function _login(data) {
    return {
        type: 'LOGIN',
        payload: data
    };
}