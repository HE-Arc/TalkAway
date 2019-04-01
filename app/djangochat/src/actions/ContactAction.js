
import { baseGraphqlUrl } from '../config/config';
import { selectServer } from './ServerAction';
import { selectChannelAuto } from './ChannelAction';
import { selectFriend } from './FriendAction';
import { requestMessageList, clearMessageList } from './MessageAction';

export function showFriends() {
    return (dispatch, getState) => {
        dispatch({
            type: 'SHOW_FRIENDS'
        });
        let friendId = getState().friend.activeFriendId;
        
        if(friendId <= 0 && getState().friend.friends.length > 0){
            friendId = getState().friend.friends[0].friend.id
        }

        if(friendId <= 0){
            dispatch(clearMessageList());
        }else{
            dispatch(selectFriend(friendId));
            let channelId = getState().friend.friends.filter(f => f.friend.id === friendId)[0].channelId;
            dispatch(requestMessageList(channelId));
        }
    }
}

export function showServers() {
    return (dispatch, getState) => {
        dispatch({
            type: 'SHOW_SERVERS'
        });
        dispatch(selectServer(getState().server.activeServerId));
        dispatch(selectChannelAuto(getState().server.activeServerId));
    }
}

export function getAllUsers() {
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
                users: resData.data.allUsers
            };
            dispatch(_getAllUsers(response));
        }).catch(err => {
            console.log(err);
        });
    }
}

function _getAllUsers(data) {
    return {
        type: 'ALL_USERS',
        payload: data
    }
}