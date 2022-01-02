import React, { useState, useEffect,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { createPost, updatePost } from '../actions/posts';

const CreatePost = () => {
    
    const ref = useRef();
    const dispatch = useDispatch();
    const [postDetails, setPostDetails] = useState({ title: '', tags: '', description: '',postImg:""});
    const { currentPost } = useSelector((state) => state.posts);

    const clear = () => {
        ref.current.value = "";
        setPostDetails({ title: '', tags: '', description: '',postImg:""})
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

    const handelPostImage = (e) => {
        setPostDetails({ ...postDetails, postImg: e.target.files[0] });
      }    

    const handelPostSubmit = (e) => {
        e.preventDefault();

        const { title, tags,description,postImg} = postDetails;
        
        if (title!== ''&&description !== '') {

            const formData = new FormData();
            formData.append('title', title);
            formData.append('tags', tags);
            formData.append('description', description);
            formData.append('postImg', postImg);            

            if (currentPost === null) {
                dispatch(createPost(formData));
            } else {
                dispatch(updatePost(currentPost._id, formData));
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
                            <div class="mb-3">
                                <label className="form-label">Post Image</label>
                                <input className="form-control form-control-sm" name="postImg" type="file" ref={ref} onChange={handelPostImage}/>
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
