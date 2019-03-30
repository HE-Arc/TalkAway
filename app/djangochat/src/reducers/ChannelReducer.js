const channelReducer = (state = {
    channels: [],
    activeChannelId: 0,
    newMessageChannelId: []
}, action) => {
    switch (action.type) {
        case "SELECT_CHANNEL":
            state = {
                ...state,
                activeChannelId: Number(action.payload.channelId)
            }
            break;
        case "SEND_MESSAGE":
            //state = state + action.value;
            break;
        case "CREATE_CHANNEL":
            state = {
                ...state,
                channels: [...state.channels, action.payload]
            }
            break;
        case "LIST_CHANNEL":
            const newChannels = state.channels.filter(c => c.serverId === action.payload.serverId);
            state = {
                ...state,
                channels: [...action.payload.channels, ...newChannels]
            }
            break;
        case "NOTIFY_NEW_MESSAGE":
            console.log(action.payload)
            state = {
                ...state,
                newMessageChannelId: [
                    ...state.newMessageChannelId,
                    action.payload
                ]
            }
            break;
        case "LOGOUT":
            state = {
                channels:[],
                activeChannelId: 0,
                newMessageChannelId: []
            }
            break;
        default:
    }
    return state;
};

export default channelReducer;
