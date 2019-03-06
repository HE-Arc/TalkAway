const serverReducer = (state = {
    id: null,
    name: '',
    channelsId: []
}, action) => {
    switch (action.type) {
        case "CREATE_SERVER":
            state = {
                ...state
            }
            break;
        case "LOGIN":
            state = {
                ...state
            }
            break;
    }
    return state;
}

export default serverReducer;