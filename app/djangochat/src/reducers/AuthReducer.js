const authReducer = (state = {
    username: '',
    email: '',
    token: '',
    isLogged: false
}, action) => {
    switch (action.type) {
        case "LOGIN":
            state = {
                ...state,
                ...action.payload
            }
            break;
        case "LOGOUT":
            state = {
                username: '',
                token: '',
                email: '',
                isLogged: false,
            }
            break;
        default:
    }
    return state;
}

export default authReducer;