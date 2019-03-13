
function _updateChannelList(data) {
    return {
        type: 'LIST_CHANNEL',
        payload: data
    }
}

export function requestChannelList(serverId) {
    return dispatch => {
        const requestBody = {
            //TODO: Update query
            query: `
            query {
                allChannels{
                    name
                    id
                }
            }
            `
        };

        return fetch('http://localhost:8080/graphql/', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        }).then(resData => {
            //TODO: update parse data after updating query
            const response = {
                serverId: serverId,
                channels: resData.data.allServers
            };
            dispatch(_updateChannelList(response));
        }).catch(err => {
            console.log(err);
        });
    }
}
