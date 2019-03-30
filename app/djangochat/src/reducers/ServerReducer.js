const serverReducer = (state = {
    servers: [],
    activeServerId: 0
}, action) => {
    switch (action.type) {
        case "SELECT_CHANNEL":
            if (action.payload.isServerChannel) {
                state = {
                    ...state,
                    servers: [
                        ...state.servers.map(
                            s => s.id !== state.activeServerId ?
                            s : {
                                ...s,
                                selectedChannel: action.payload.channelId
                            })
                    ]
                }
            }
            break;
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
        case "EDIT_SERVER":
            const editedServer = action.payload;
            state = {
                ...state,
                servers: state.servers.map(s=>s.id===editedServer.id?editedServer:s)
            }
        default:
    }
    return state;
}

export default serverReducer;