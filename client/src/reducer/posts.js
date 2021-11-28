const initialState = {
    posts: [],
    currentPost: null,
    useProfile:false
}

const postReducer = (state = initialState, actions) => {

    switch (actions.type) {
        case 'FETCH_ALL':
            return {
                ...state,
                posts: actions.payload,
                useProfile:false
            }
        case 'CREATE_POST':
            return {
                ...state,
                posts: [actions.payload,...state.posts],
            }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== actions.payload),
            }
        case 'CURRENT_POST':
            return {
                ...state,
                currentPost: actions.payload,
            }
        case 'UPDATE_POST':
            return {
                ...state,
                posts: state.posts.map((post) => post._id === actions.payload._id?actions.payload:post)
            }
        case 'USER_PROFILE':
            return {
                ...state,
                posts: state.posts.filter((post) => actions.payload === post.creator_id),
                useProfile:true                
            }    
        default:
            return state;
    }

}

export default postReducer;