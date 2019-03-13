const channelReducer = (state = {
    channels:{}
}, action) => {
    switch (action.type) {
        case "SEND_MESSAGE":
            //state = state + action.value;
            break;
        default:
        case "LIST_CHANNEL":
            state.channels[action.payload.serverId] = [action.payload.channels]
            break;
    }
    return state;
};

export default channelReducer;