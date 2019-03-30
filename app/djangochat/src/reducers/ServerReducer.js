const serverReducer = (state = {
    servers: [],
    activeServerId: 0
}, action) => {
    switch (action.type) {
        case "SELECT_CHANNEL":
            console.log(action.payload)
            if (action.payload.isServerChannel) {
                console.log(state.servers)
                console.log(state.servers.filter(s => Number(s.id) === state.activeServerId))
                state = {
                    ...state,
                    servers: [
                        ...state.servers.map(
                            s => Number(s.id) !== state.activeServerId ?
                                s : {
                                    ...s,
                                    selectedChannel: Number(action.payload.channelId)
                                })
                    ]
                }
            }
            break;
        case "SELECT_SERVER":
            state = {
                ...state,
                activeServerId: Number(action.payload)
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
                servers: action.payload
            };
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