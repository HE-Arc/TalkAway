const contactReducer = (state = {
    serversDisplayed: true,
    users: [],
    images: {}
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
        case "LOGIN":
            const me = {}
            me[action.payload.id] = action.payload.image
            state = {
                ...state,
                images: {
                    ...state.images,
                    ...me
                }
            }
            break;
        case "ADD_USER_SERVER":
            let newOne = {};
            newOne[action.payload.user.id] = action.payload.user.image
            state = {
                ...state,
                images: {
                    ...state.images,
                    ...newOne
                }
            }
            break;
        case "LIST_FRIEND":
            let imagesFriend = {}
            action.payload.forEach(f => {
                imagesFriend[f.friend.id] = f.friend.image
            })
            state = {
                ...state,
                images: {
                    ...state.images,
                    ...imagesFriend
                }
            }
            break;
        case "LIST_SERVER":
            const usersServers = action.payload.map(s => s.userSet)
            let images = {};
            usersServers.forEach(users => {
                users.forEach(u => {
                    images[u.id] = u.image
                })
            });
            state = {
                ...state,
                images: {
                    ...state.images,
                    ...images
                }
            }
            break;
        case "EDIT_PROFIL":
            let myself = {};
            myself[action.payload.id] = action.payload.image
            state = {
                ...state,
                images: {
                    ...state.images,
                    ...myself
                }
            }
            break;
        case "ALL_USERS":
            state = {
                ...state,
                users: action.payload.users
            };
            break;
        case "LOGOUT":
            state = {
                serversDisplayed: true,
                users: []
            }
            break;
        default:
    }
    return state;
}

export default contactReducer;