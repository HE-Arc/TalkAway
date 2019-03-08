const friendReducer = (state = {
    friends: []
}, action) => {
    switch (action.type) {
        case "ADD_FRIEND":
            state = {
                friends: state
                    .friends
                    .push(action.payload)
            }
            break;
        default:
    }
    return state;
}

export default friendReducer;