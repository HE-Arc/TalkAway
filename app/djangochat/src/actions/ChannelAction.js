
import {baseGraphqlUrl} from '../config/config';

function _updateChannelList(data) {
    return {
        type: 'LIST_CHANNEL',
        payload: data
    }
}

export function selectChannel(channelId) {
    return (dispatch) => {
        dispatch({
            type: 'SELECT_CHANNEL',
            payload: channelId
        });
    }
}

export function requestChannelList(serverId) {
    return (dispatch, getState) => {
        const requestBody = {
            query: `
            query{
                serverChannels(serverId:${serverId}){
                  id
                  name
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
            let response = {
                serverId: serverId,
                channels: resData.data.serverChannels
            };
            if(response.channels == null){
                response.channels = [];
            }
            dispatch(_updateChannelList(response));
        }).catch(err => {
            console.log(err);
        });
    }
}
