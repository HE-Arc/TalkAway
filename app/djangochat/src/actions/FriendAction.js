
import {baseGraphqlUrl} from '../config/config';

export function requestFriendList() {
    return (dispatch, getState) => {
        const requestBody = {
            query: `
            query{
                myFriends{
                    id
                    username
                }
              }
            `
        };

        return fetch(baseGraphqlUrl+'/', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT '+getState().auth.token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        }).then(resData => {
            let response = resData.data.myFriends;
            if(response == null){
                response = []
            }
            dispatch(_updateFriendList(response));
        }).catch(err => {
            console.log(err);
        });
    }
}

function _updateFriendList(data) {
    return {
        type: 'LIST_FRIEND',
        payload: data
    }
}