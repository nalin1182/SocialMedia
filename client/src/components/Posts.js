import React,{useEffect} from 'react'
import { useDispatch} from 'react-redux';

import CreatePost from './CreatePost'
import Postlists from './Postlists'
import {getAllPosts,currentPost} from '../actions/posts';

const Posts = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());

        return () => {
            dispatch(currentPost(null));
        }
    }, [dispatch])
    
    return (
        <>
         <CreatePost/>
         <Postlists/>
        </>
    )
}

export default Posts
