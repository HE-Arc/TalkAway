const channelReducer = (state = {

}, action) => {
    switch (action.type) {
        case "SEND_MESSAGE":
            state = state + action.value;
            break;
        case "SUBSTRACT":
            break;
        default:
    }
    return state;
};

export default channelReducer;