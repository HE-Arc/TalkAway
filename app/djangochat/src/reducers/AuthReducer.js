const authReducer = (state = {
    username: '',
    email: '',
    token: ''
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
                email: ''
            }
            break;
        default:
    }
    return state;
}

export default authReducer;