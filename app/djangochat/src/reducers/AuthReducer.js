const authReducer = (state = {
    id: null,
    username: '',
    email: '',
    token: '',
    isLogged: false,
    image: ''
}, action) => {
    switch (action.type) {
        case "EDIT_PROFIL":
            state = {
                ...state,
                ...action.payload
            }
            break;
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
                image: ''
            }
            break;
        default:
    }
    return state;
}

export default authReducer;