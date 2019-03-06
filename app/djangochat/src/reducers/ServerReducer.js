const serverReducer = (state = {
    id: null,
    name: '',
    channelsId: []
}, action) => {
    switch (action.type) {
        case "CREATE_SERVER":
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

export default serverReducer;