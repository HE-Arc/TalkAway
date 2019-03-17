const authReducer = (state = {
    id: null,
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
                is: null,
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