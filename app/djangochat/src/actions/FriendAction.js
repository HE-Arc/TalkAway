export function requestFriendList() {
    return dispatch => {
        const requestBody = {
            //TODO: Update query
            query: `
            query{
                allUsers{
                    id
                    username
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
            //TODO: update parse taka after updating query
            const response = resData.data.allUsers;
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