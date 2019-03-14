const serverReducer = (state = {
    servers: []
}, action) => {
    switch (action.type) {
        case "CREATE_SERVER":
            //TODO
            state = {
                ...state,
            }
            break;
        case "LIST_SERVER":
            state = {
                servers: action.payload
            }
            break;
        default:
    }
    return state;
}

export default serverReducer;