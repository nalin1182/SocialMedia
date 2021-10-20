import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { createPost, updatePost } from '../actions/posts';

const CreatePost = () => {

    const dispatch = useDispatch();
    const [postDetails, setPostDetails] = useState({ title: '', tags: '', description: '' });
    const { currentPost } = useSelector((state) => state.posts);

    const clear = () => {
        setPostDetails({ title: '', tags: '', description: '' })
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handelPostChange = (e) => {
        setPostDetails({ ...postDetails, [e.target.name]: e.target.value });
    }

    const handelPostSubmit = (e) => {
        e.preventDefault();
        if (postDetails.title !== '' && postDetails.description !== '') {
            if (currentPost === null) {
                dispatch(createPost(postDetails));
            } else {
                dispatch(updatePost(currentPost._id, postDetails));
            }
        }
        clear();
    }

    useEffect(() => {

        if (currentPost !== null) {
            setPostDetails(currentPost);
            scrollToTop();
        }

    }, [currentPost])

    return (
        <div className="row">
            <div className="col-md-11 col-sm-12">
                <div className="card">
                    <div className="card-header">
                        Write something new
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row ">
                                <div className="col-md-6 mb-3">
                                    <input type="text" className="form-control" name="title" value={postDetails.title || ''} placeholder="Title" onChange={handelPostChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" className="form-control" name="tags" value={postDetails.tags || ''} placeholder="Tags" onChange={handelPostChange} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" rows="3" name="description" value={postDetails.description || ''} placeholder="Description" onChange={handelPostChange}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-sm" onClick={handelPostSubmit}>
                                {currentPost ? 'Update Post' : 'Create Post'}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default CreatePost
