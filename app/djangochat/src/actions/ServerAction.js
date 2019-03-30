
import { baseGraphqlUrl } from '../config/config';

export function _createServer(data) {
    return {
        type: 'CREATE_SERVER',
        payload: data
    }
}

function _updateServerList(data) {
    return {
        type: 'LIST_SERVER',
        payload: data
    }
}

export function selectServer(serverId) {
    return (dispatch) => {
        dispatch({
            type: 'SELECT_SERVER',
            payload: serverId
        });
    }
}

function _updateMessageList(data) {
    return {
        type: 'LIST_MESSAGE',
        payload: data
    }
}

export function requestCreateServer(serverName) {
    return (dispatch, getState) => {
        const requestBody = {
            query: `
            mutation{
                createServer(name:"${serverName}"){
                    server{
                        id
                        name
                    }
                }
            }
            `
        };

        return fetch(baseGraphqlUrl + '/', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + getState().auth.token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        }).then(resData => {
            const server = resData.data.createServer.server;
            dispatch(_createServer(server));
            dispatch(selectServer(server.id));
            dispatch(_updateMessageList([]));
            return server.id
        });
    }
}

export function requestServerList() {
    return (dispatch, getState) => {
        const requestBody = {
            query: `
            query{
                myServers{
                    name
                    id
                }
            }
            `
        };

        return fetch(baseGraphqlUrl + '/', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + getState().auth.token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        }).then(resData => {
            let response = resData.data.myServers;
            if (response == null) {
                response = [];
            }
            dispatch(_updateServerList(response));
        }).catch(err => {
            console.log(err);
        });
    }
}


export function requestAddUser(user_id, server_id) {
    return (dispatch, getState) => {
        const requestBody = {
            query: `
            mutation {
                addUser(userId: ${user_id}, serverId: ${server_id}) {
                    right {
                        id
                    }
                }
            }
            `
        };
        return fetch(baseGraphqlUrl + '/', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + getState().auth.token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        })
    }
}
