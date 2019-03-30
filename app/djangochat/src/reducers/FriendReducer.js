const friendReducer = (state = {
    friends: [],
    activeFriendId: 0
}, action) => {
    switch (action.type) {
        case "SELECT_FRIEND":
            state = {
                ...state,
                activeFriendId: action.payload
            };
            break;
        case "ADD_FRIEND":
            state = {
                ...state,
                friends: [
                    ...state.friends,
                    action.payload
                ]
            }
            break;
        case "LIST_FRIEND":
            state = {
                friends: action.payload,
                activeFriendId: 0
            }
            break;
        case "LOGOUT":
            state = {
                friends: [],
                activeFriendId: 0
            }
            break;
        default:
    }
    return state;
}

export default friendReducer;