import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { deletePost, currentPost } from '../actions/posts';

const Postlists = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);
    const { profile } = useSelector((state) => state.auth);


    const handeldeletePost = (id) => {
        dispatch(deletePost(id));
        dispatch(currentPost(null));
    }

    const handelUpdatePost = (post) => {
        dispatch(currentPost(post));
    }

    return (
        <>
            <div className="row postContainer mt-5">
                {posts?.map((post, i) =>
                    
                    <div className="col-md-11 col-sm-12 mt-2 " key={i}>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h5 className="card-title my-0">{post.title}</h5>
                                    
                                    {profile.id === post.creator_id?
                                        <div>
                                            <i className="far fa-trash-alt mx-2" onClick={() => handeldeletePost(post._id)}></i>
                                            <i className="far fa-edit mx-2" onClick={() => handelUpdatePost(post)} ></i>
                                        </div> : null
                                    }
                                </div>
                                <small className="text-muted">{post.tags}</small>
                                <p className="card-text mt-1">{post.description}</p>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </>

    )
}

export default Postlists;
