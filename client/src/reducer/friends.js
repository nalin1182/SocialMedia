const initialState = {
    Users: [],
    Friends: []
}

const friendReducer = (state = initialState, actions) => {

    switch (actions.type) {
        case 'ALL_USERS':
            return {
                ...state,
                Users: actions.payload
            }
        case 'ALL_FRIENDS':
            return {
                ...state,
                Friends: actions.payload
            }
        case 'ADD_FRIENDS':
            return {
                ...state,
                Users: state.Users.filter((user) => user._id !== actions.payload.id),
                Friends: [...state.Friends,actions.payload.newFriend]
            }
        case 'REMOVE_FRIEND':
            return {
                ...state,
                Friends: state.Friends.filter((friend) => friend._id !== actions.payload.id),
                Users:[...state.Users,actions.payload.removeFriend]
            }
        default:
            return state;
    }

}

export default friendReducer;