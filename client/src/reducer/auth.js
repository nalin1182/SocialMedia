const initialAuthState = {
    profile: {},
    error: null,
    isLoggedin: false,
    inProgress: false,
};

const autReducer = (state = initialAuthState, actions) => {

    switch (actions.type) {
        case 'LOGIN_START':
        case 'SIGN_UP_START':
            return {
                ...state,
                inProgress: true
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                profile: actions.payload,
                isLoggedin: true,
                inProgress: false
            }
        case 'LOGIN_FAILED':
        case 'SIGN_UP_SUCCESS':
        case 'SIGN_UP_FAILED':       
            return {
                ...state,
                inProgress: false
            }
        case 'AUTHENTICATE_USER':
            return {
                ...state,
                profile: actions.payload,
                isLoggedin: true,
            };
        case 'LOG_OUT':
            return {
                ...state,
                profile: {},
                isLoggedin: false,
            };
        default:
            return state;
    }

}

export default autReducer;