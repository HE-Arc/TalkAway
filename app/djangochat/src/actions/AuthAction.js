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
            const response = {
                token: resData.data.tokenAuth.token,
                username: username,
            }
            dispatch(login(response));
        }).catch(err => {
            console.log(err);
        });
    }
}

function login(data) {
    return {
        type: 'LOGIN',
        payload: data
    };
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