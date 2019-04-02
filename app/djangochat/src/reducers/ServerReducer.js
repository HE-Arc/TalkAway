const serverReducer = (state = {
    servers: [],
    activeServerId: '0'
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
        case "ADD_USER_SERVER":
        
            console.log(action.payload.serverId)
            state = {
                ...state,
                servers: [
                    ...state.servers.map(s=>
                        (s.id === action.payload.serverId ? {
                            ...s,
                            userSet:[
                                ...s.userSet,
                                {
                                    ...action.payload.user,
                                    image: undefined
                                }
                            ]
                        } : {
                            ...s
                        }))
                ]
            }
            break;
        case "CREATE_SERVER":
            state = {
                ...state,
                activeServerId: Number(state.activeServerId) <= 0 ? action.payload.id : state.activeServerId,
                servers: [
                    ...state.servers,
                    action.payload
                ]
            };
            break;
        case "LIST_SERVER":
            state = {
                ...state,
                activeServerId: Number(state.activeServerId) <= 0 && action.payload.length > 0 ? action.payload[0].id : state.activeServerId,
                servers: [
                    ...action.payload.map(s=>
                        ({
                            ...s,
                            userSet:s.userSet.map(u=>
                                ({
                                    ...u,
                                    image:undefined
                                }))
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
                activeServerId: '0'
            }
            break;
        default:
    }
    return state;
}

export default serverReducer;