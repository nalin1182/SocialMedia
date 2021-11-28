import * as api from '../api/index';


export const getAllPosts = ()=> async(dispatch)=>{

    try {
      
      const {data} = await api.getAllPosts();
      dispatch({type:'FETCH_ALL',payload:data});

    } catch (error) {
      console.log(error);
    }

}

export const createPost = (formdata)=> async(dispatch)=>{

  try {

      const {data} = await api.createPost(formdata);
      dispatch({type:'CREATE_POST',payload:data.newPost});
    

  } catch (error) {
      console.log(error);
  }

}

export const deletePost = (id)=> async(dispatch)=>{

    try {
      
      await api.deletePost(id);
      dispatch({type:'DELETE_POST',payload:id});

    } catch (error) {
      console.log(error);
    }

}

export const currentPost = (post)=>async(dispatch)=>{

  dispatch({type:'CURRENT_POST',payload:post});

}

export const updatePost = (id,formData)=> async(dispatch)=>{

  try {

    const {data} = await api.updatePost(id,formData);
    dispatch({type:'UPDATE_POST',payload:data.updatedPost});

  } catch (error) {
    console.log(error);
  }

  dispatch(currentPost(null));

}

export const reactPost = (id)=>async(dispatch)=>{

  try{

    const {data} = await api.reactPost(id);
    dispatch({type:'UPDATE_POST',payload:data.updatedPost});

  }catch(error){
    console.log(error);
  }

}

export const userProfile = (id)=>async (dispatch)=>{
   try{
    dispatch({type:'USER_PROFILE',payload:id});
   }catch(error){
      console.log(error);
   }
}