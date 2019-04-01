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
            state = {
                ...state,
                servers: [
                    ...state.servers,
                    action.payload
                ]
            };
            break;
        case "LIST_SERVER":
            state = {
                ...state,
                servers: [
                    ...action.payload.map(s=>
                        ({
                            ...s,
                            userSet:[s.userSet.map(u=>
                                ({
                                    ...u,
                                    image:undefined
                                }))
                            ]
                        }))
                ]
            };
            break;
        case "EDIT_SERVER":
            const editedServer = action.payload;
            state = {
                ...state,
                servers: state.servers.map(s=>s.id===editedServer.id?editedServer:s)
            }
            break;
        case "LOGOUT":
            state = {
                servers: [],
                activeServerId: 0
            }
            break;
        default:
    }
    return state;
}

export default serverReducer;