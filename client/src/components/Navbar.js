import React from 'react'
import { Link} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';

import {logout} from '../actions/auth';

const Navbar = () => {
    const dispatch = useDispatch();
    const {isLoggedin,profile} = useSelector((state)=>state.auth);
    
    const handelLogOut = ()=>{
        localStorage.removeItem('profile');
        dispatch(logout());
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand mb-0 h1" to="/">SocialNav</Link>
                <div>
                    {!isLoggedin?<Link type="button" className="btn btn-outline-primary btn-sm mx-2" to="/auth">Login</Link>:
                    <>
                    <small className="text-muted">{profile.name.toUpperCase()}</small> 
                    <button type="button" className="btn btn-outline-primary btn-sm mx-2" onClick={handelLogOut}>Logout</button> 
                    </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
