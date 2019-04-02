
import { baseGraphqlUrl } from '../config/config';
import { requestMessageList } from './MessageAction';

export function selectChannel(channelId) {
    return (dispatch) => {
        dispatch({
            type: 'SELECT_CHANNEL',
            payload: {
                isServerChannel: true,
                channelId: channelId
            }
        });
    }
}

export function selectChannelAuto(serverId) {
    return (dispatch, getState) => {
        let server = getState().server.servers.filter(s => s.id === serverId);
        let selectedChannel = server.length > 0 ? server[0].selectedChannel : undefined;
        if (selectedChannel === undefined) {
            const channelList = getState().channel.channels.filter(c => c.serverId === serverId);
            selectedChannel = channelList.length > 0 ? channelList[0].id : 0;
        }
        dispatch(selectChannel(selectedChannel));
        dispatch(requestMessageList(selectedChannel));
    }
}

function _updateChannelList(data) {
    return {
        type: 'LIST_CHANNEL',
        payload: data
    }
}

function _createChannel(data) {
    return {
        type: 'CREATE_CHANNEL',
        payload: data
    }
}
export function requestCreateChannel(serverId, name) {
    return (dispatch, getState) => {
        const requestBody = {
            query: `
            mutation{
                createChannel(serverId:${serverId}, name:"${name.replace(/"/g, '\\"')}"){
                    channel{
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
            let response = { ...resData.data.createChannel.channel, serverId: serverId };
            dispatch(_createChannel(response));
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
                    server{
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
                serverId: serverId,
                channels: resData.data.serverChannels.map(c => { return { ...c, serverId: serverId } })
            };
            if (response.channels == null) {
                response.channels = [];
            }
            dispatch(_updateChannelList(response));
        });
    }
}

