import React,{useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux';

import CreatePost from './CreatePost'
import Postlists from './Postlists'
import UserProfile  from './UserProfile';
import {getAllPosts,currentPost} from '../actions/posts';

const Posts = () => {

    const dispatch = useDispatch();
    const { useProfile } = useSelector((state) => state.posts);
    console.log(useProfile);

    useEffect(() => {
        dispatch(getAllPosts());

        return () => {
            dispatch(currentPost(null));
        }
    }, [dispatch])
    
    return (
        <>

         {useProfile&&<UserProfile/>}
         <CreatePost/>
         <Postlists/>
        </>
    )
}

export default Posts
