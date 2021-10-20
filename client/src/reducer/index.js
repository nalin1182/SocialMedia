import { combineReducers } from "redux";
import posts from './posts'
import auth from './auth';
import friends from './friends';

export default combineReducers({
    posts,
    auth,
    friends
})