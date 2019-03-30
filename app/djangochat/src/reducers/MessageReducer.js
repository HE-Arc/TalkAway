const serverReducer = (state = {
    messages: [],
}, action) => {
    switch (action.type) {
        case "ADD_MESSAGE":
            state = {
                ...state,
                messages: [...state.messages, action.payload]
            };
            break;
        case "SEND_MESSAGE":
                state = {
                    ...state,
                    messages: [...state.messages, action.payload]
                }
                break;
        case "LIST_MESSAGE":
            state = {
                ...state,
                messages: action.payload
            };
            break;
        case "LOGOUT":
            state = {
             messages: []
            }
            break;
        default:
    }
    return state;
}

export default serverReducer;