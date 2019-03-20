export function showFriends() {
    return (dispatch) => {
        dispatch({
            type: 'SHOW_FRIENDS'
        });
    }
}

export function showServers() {
    return (dispatch) => {
        dispatch({
            type: 'SHOW_SERVERS'
        });
    }
}