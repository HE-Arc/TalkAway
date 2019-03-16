const serverReducer = (state = {
    servers: [],
    activeServerId: 0
}, action) => {
    switch (action.type) {
        case "SELECT_SERVER":
            state = {
                ...state,
                activeServerId: action.payload
            };
            break;
        case "CREATE_SERVER":
            //TODO
            state = {
                ...state,
            };
            break;
        case "LIST_SERVER":
            state = {
                ...state,
                servers: action.payload
            };
            break;
        default:
    }
    return state;
}

export default serverReducer;