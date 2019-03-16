const channelReducer = (state = {
    channels:[],
    activeChannelId:0
}, action) => {
    switch (action.type) {
        case "SELECT_CHANNEL":
            state = {
                ...state,
                activeChannelId: action.payload
            }
            break;
        case "SEND_MESSAGE":
            //state = state + action.value;
            break;
        case "LIST_CHANNEL":
        console.log(action.payload.channels)
            state = {
                ...state,
                activeChannelId : 0,
                channels : action.payload.channels,
            }
            break;
        default:
        }
    return state;
};

export default channelReducer;
