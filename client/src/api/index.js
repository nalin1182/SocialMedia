import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000/api'});

API.interceptors.request.use((req)=>{

    const profile = localStorage.getItem('profile');
    if(profile){

        req.headers.authorization = JSON.parse(profile).token;
    }

    return req;
});

//routes for authentication
export const login = (data)=>API.post('/auth/signIn',data);
export const signUp = (data)=>API.post('/auth/signUp',data);

//routes for posts
export const getAllPosts = ()=>API.get('/posts/allPosts');
export const createPost = (data)=>API.post('/posts/createPosts',data);
export const deletePost = (id)=>API.delete(`/posts/deletePosts/${id}`);
export const updatePost = (id,data)=>API.put(`/posts/updatePosts/${id}`,data);
export const reactPost =  (id)=>API.put(`/posts/likePosts/${id}`);

export const getAllUsers = ()=>API.get('/friends/allUsers'); 
export const getAllFriends = ()=>API.get('/friends/allFriends'); 
export const addFriend = (id)=>API.put(`/friends/addFriend/${id}`); 
export const removeFriend = (id)=>API.put(`/friends/removeFriend/${id}`);