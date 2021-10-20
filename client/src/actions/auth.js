import * as api from '../api/index';

export const login =(formData)=> async (dispatch)=>{

    try{
        dispatch({type:'LOGIN_START'})

        const {data} = await api.login(formData);
        let {profile} = data;

        localStorage.setItem('profile',JSON.stringify(profile));

        dispatch({type:'LOGIN_SUCCESS',payload:profile});

    }catch(error){
       console.log(error);
       dispatch({type:'LOGIN_FAILED'});
    }

}

export const authenticate_user = (data)=>(dispatch)=>{
    dispatch({type:'AUTHENTICATE_USER',payload:data});
}

export const logout = ()=>(dispatch)=>{
    dispatch({type:'LOG_OUT'});
}

export const signUp = (formData)=> async(dispatch)=>{

    try{
        dispatch({type:'SIGN_UP_START'});

        await api.signUp(formData);

        dispatch({type:'SIGN_UP_SUCCESS'});
    }catch(error){
        console.log(error.message);
        dispatch({type:'SIGN_UP_FAILED'});
    }

}