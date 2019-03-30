
import { baseGraphqlUrl } from '../config/config';

export function showFriends() {
    return (dispatch) => {
        dispatch({
            type: 'SHOW_FRIENDS'
        });
    }
}

export function showServers() {
    return (dispatch) => {
        dispatch({
            type: 'SHOW_SERVERS'
        });
    }
}

export function getAllUsers(){
    return (dispatch, getState) => {
        const requestBody = {
            query: `
            query{
                allUsers{
                    id
                    username
                    servers{
                        id
                    }
                    friends{
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
        }).then(resData => {
            let response = {
                users:resData.data.allUsers
            };
            dispatch(_getAllUsers(response));
        }).catch(err => {
            console.log(err);
        });
    }
}

function _getAllUsers(data){
    return {
        type: 'ALL_USERS',
        payload: data
    }
}