import {
    baseWebsocketUrl
} from '../config/config';

export function initWebSocket() {
    return (dispatch, getState) => {
        document.cookie = "token=" + getState().auth.token + ";max-age=1";
        let ws = new WebSocket(
            baseWebsocketUrl);
        dispatch(_connectWS(ws));
    };
}

export function connectChannel(channel_id) {
    return (dispatch, getState) => {
        if (getState().ws.ws.readyState === WebSocket.OPEN) {
            getState().ws.ws.send(JSON.stringify({
                connectChannel: {
                    id: channel_id
                }
            }));
        }
    };
}

function _connectWS(data) {
    return {
        type: 'CONNECT_WS',
        payload: data
    }
}