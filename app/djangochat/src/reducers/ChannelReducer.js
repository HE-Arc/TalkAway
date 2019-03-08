const channelReducer = (state = {
    channels:[]
}, action) => {
    switch (action.type) {
        case "SEND_MESSAGE":
            state = state + action.value;
            break;
        default:
    }
    return state;
};

export default channelReducer;