const friendReducer = (state = {
    friends: [],
}, action) => {
    switch (action.type) {
        case "ADD_FRIEND":
            state = {
                ...state
            }
            break;
        default:
    }
    return state;
}

export default friendReducer;