
import {baseGraphqlUrl} from '../config/config';

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
                getJWTToken(username: "${username}", password: "${password}") {
                    token
                    user {
                        id
                        username
                        image
                    }
                }
            }
            `
        };

        return fetch(baseGraphqlUrl+'/', {
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
            const data = resData.data.getJWTToken;
            const response = {
                token: data.token,
                isLogged: true,
                ...data.user
            }
            
            dispatch(_login(response));
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

        return fetch(baseGraphqlUrl+'/', {
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
            return dispatch(requestLogin(username, password));
        })
    }
}

export function requestEditProfile(image) {
    return dispatch => {
        //TODO: Create mutation on server side
        const requestBody = {
            query: `
            mutation {
                editProfile(image:"${image}") {
                  user {
                    username
                  }
                }
              }
            `
        };

        return fetch(baseGraphqlUrl+'/', {
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
            //TODO: update profile image
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