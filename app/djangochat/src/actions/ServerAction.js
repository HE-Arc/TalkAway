import {
    baseGraphqlUrl
} from '../config/config';

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

function _editServer(data) {
    return {
        type: 'EDIT_SERVER',
        payload: data
    }
}

export function _addUser(data) {
    return {
        type: 'ADD_USER_SERVER',
        payload: data
    }
}


export function selectServer(serverId) {
    return (dispatch) => {
        dispatch({
            type: 'SELECT_SERVER',
            payload: serverId
        });
    };
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
                createServer(name:"${serverName.replace(/"/g, '\\"')}"){
                    server{
                        id
                        name
                        image
                        userSet{
                            username
                            id
                        }
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
                    image
                    userSet{
                        username
                        id
                        image
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
            let response = resData.data.myServers;
            if (response == null) {
                response = [];
            }
            dispatch(_updateServerList(response));
        });
    }
}


export function requestEditServer(serverId, name, image, userAddingRight) {
    return (dispatch, getState) => {
        const requestBody = {
            query: `
            mutation{
                editServer(serverId:${serverId},name:"${name.replace(/"/g, '\\"')}",image:"${image}",userAddingRight:${userAddingRight}){
                    server{
                        image
                        name
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
        }).then((data) => {
            let serverUpdated = data.data.editServer.server;
            dispatch(_editServer(serverUpdated));
        });
    }
}


export function requestAddUser(userId, serverId) {
    return (dispatch, getState) => {
        const requestBody = {
            query: `
            mutation {
                addUser(userId: ${userId}, serverId: ${serverId}) {
                    right {
                        id
                        user {
                            image
                            id
                            username
                        }
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
        }).then((response) => {
            const data = {
                serverId: serverId,
                user: response.data.addUser.right.user
            }
            dispatch(_addUser(data))
            getState().ws.ws.send(JSON.stringify({
                action: {
                    type: "user_added",
                    server_id: serverId,
                    user: response.data.addUser.right.user,
                    my_id: getState().auth.id
                }
            }));

        });
    };
}
