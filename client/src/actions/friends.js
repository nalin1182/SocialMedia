import * as api from '../api/index';

export const getAllUsers = () => async (dispatch) => {
    try {

        const { data } = await api.getAllUsers();
        dispatch({ type: 'ALL_USERS', payload: data.users })


    } catch (error) {
        console.log(error.message);
    }
}

export const getAllFriends = () => async (dispatch) => {
    try {

        const { data } = await api.getAllFriends();
        dispatch({ type: 'ALL_FRIENDS', payload: data })


    } catch (error) {
        console.log(error.message);
    }
}

export const addFriend = (id) => async (dispatch) => {
    try {

        const { data } = await api.addFriend(id);
        dispatch({ type: 'ADD_FRIENDS', payload: { id, newFriend: data.reciever } });


    } catch (error) {
        console.log(error.message);
    }
}

export const removeFriend = (id) => async (dispatch) => {

    try {

        const { data } = await api.removeFriend(id);
        const { reciever } = data;
        dispatch({
            type: 'REMOVE_FRIEND', payload: {
                id, removeFriend: reciever
            }
        });

    } catch (error) {
        console.log(error.message);
    }

}