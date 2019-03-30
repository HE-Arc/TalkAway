
import {baseGraphqlUrl} from '../config/config';

export function selectFriend(friendId) {
    return (dispatch, getState) => {
        dispatch({
            type: 'SELECT_FRIEND',
            payload: friendId
        });
        dispatch({
            type: 'SELECT_CHANNEL',
            payload: {
                isServerChannel:false,
                channelId:getState().friend.friends.filter(f=>Number(f.friend.id) === Number(friendId))[0].channelId
            }
        });
    };
}

export function requestFriendList() {
    return (dispatch, getState) => {
        const requestBody = {
            query: `
            query{
                myFriends{
                  userOne{
                    username
                    id
                  }
                  userTwo{
                    username
                    id
                  }
                  chanel{
                    id
                  }
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
            let data = resData.data.myFriends;
            const id = getState().auth.id;
            let friends = data.map(d=>{
                const friendData = d.userOne.id !== id ? d.userOne : d.userTwo;
                return {
                    channelId: d.chanel.id,
                    friend:{
                        ...friendData
                    }
                }
            });
            if(friends == null){
                friends = []
            }
            dispatch(_updateFriendList(friends));
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


export function requestAddFriend(user_id) {
    return (dispatch, getState) => {
        const requestBody = {
            query: `
            mutation{
                createFriend(friendId:${user_id}){
                    friend{
                        chanel{
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
        })
    }
}
