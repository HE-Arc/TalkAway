const contactReducer = (state = {
    serversDisplayed: true,
    allUsers:{
        users:[]
    }
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
        case "ALL_USERS":
            state = {
                ...state,
                allUsers: action.payload
            };
            break;
        default:
    }
    return state;
}

export default contactReducer;