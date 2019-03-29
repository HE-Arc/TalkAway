
import { baseGraphqlUrl } from '../config/config';

export function createServer(data) {
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
