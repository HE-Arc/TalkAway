const contactReducer = (state = {
    serversDisplayed: true,
}, action) => {
    switch (action.type) {
        case "SHOW_FRIENDS":
            state = {
                ...state,
                serversDisplayed: false
            };
            break;
        case "SHOW_SERVERS":
            state = {
                ...state,
                serversDisplayed: true
            };
            break;
        default:
    }
    return state;
}

export default contactReducer;