
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

export function requestServerList() {
    return dispatch => {
        const requestBody = {
            //TODO: Update query
            query: `
            query {
                allServers{
                    name
                    id
                    channelSet{
                        id
                    }
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
            const response = resData.data.allServers;
            dispatch(_updateServerList(response));
        }).catch(err => {
            console.log(err);
        });
    }
}
