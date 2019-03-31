
const webSocketReducer = (state = {
    ws:  null
}, action) => {
    switch (action.type) {
        case "CONNECT_WS":
            state = {
                ...state,
                ws: action.payload
            };
            break;

        default:
    }
    return state;
}

export default webSocketReducer;