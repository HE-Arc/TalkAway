
import {baseGraphqlUrl} from '../config/config';

function _updateMessageList(data) {
    return {
        type: 'LIST_MESSAGE',
        payload: data
    }
}

export function addMessage(message) {
    return (dispatch) => {
        dispatch({
            type: 'SEND_MESSAGE',
            payload: message
        });
    }
}

export function requestSendMessage(text, channelId) {
    return (dispatch, getState) => {
        const requestBody = {
            query: `
            mutation {
                createMessage(text: "${text}", channelId: ${channelId}) {
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
        })
    }
}

export function requestMessageList(channelId) {
    return (dispatch, getState) => {
        const requestBody = {
            query: `
            query{
                allMessagesByChannel(channelId:${channelId}){
                  id,
                  date,
                  text,
                  user{
                    id
                    username
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
            let response = resData.data.allMessagesByChannel;
            if(response == null){
                response = [];
            }
            dispatch(_updateMessageList(response));
        }).catch(err => {
            console.log(err);
        });
    }
}
