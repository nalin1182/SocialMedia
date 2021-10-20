import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { login, signUp } from '../actions/auth';

const Auth = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { isLoggedin, inProgress } = useSelector((state) => state.auth);

    const [isLogin, setLogin] = useState(true);
    const [userDetails, setUserDetails] = useState({ username: '', email: '', password: '', confirm_password: '' });

    const clear = () => {
        setUserDetails({ username: '', email: '', password: '', confirm_password: '' });
    }

    const handelSignUpform = () => {
        setLogin(!isLogin);
    }

    const handelForm = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (isLogin && (userDetails.email !== '' && userDetails.password !== '')) {
            dispatch(login(userDetails));

        }

        if (!isLogin && (userDetails.username !== '' && userDetails.email !== '' && userDetails.password !== '' && userDetails.confirm_password !== '')) {
            dispatch(signUp(userDetails));
            history.push('/');
        }

        clear();

    }

    if (isLoggedin) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container row my-3">
            <div className="col-md-8 col-sm-12">
                <div className="card">
                    <div className="card-header">
                        {isLogin ? 'Please Login to your account' : 'Create a new account'}
                    </div>
                    <div className="card-body">
                        <form>

                            {!isLogin && <div className="mb-3">
                                <input type="text" className="form-control" name="username" value={userDetails.username || ''} placeholder="Username" onChange={handelForm} />
                            </div>
                            }
                            <div className="mb-3">
                                <input type="email" className="form-control" name="email" value={userDetails.email || ''} placeholder="Email" onChange={handelForm} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" name="password" value={userDetails.password || ''} placeholder="password" onChange={handelForm} />
                            </div>

                            {!isLogin &&
                                <div className="mb-3">
                                    <input type="password" className="form-control" name="confirm_password" value={userDetails.confirm_password || ''} placeholder="confirm password" onChange={handelForm} />
                                </div>
                            }


                            <div className="my-0">{isLogin ? `Don't have an account` : `Have an account`}? <span className="form-text" style={{ cursor: 'pointer' }} onClick={handelSignUpform}>
                                {isLogin ? 'Sign Up' : 'Login'}
                            </span></div>
                            {isLogin ?
                                <button type="submit" className="btn btn-primary btn-sm mt-1" onClick={submitForm} disabled={inProgress}>
                                    {!inProgress ? 'Login' : 'Progress...'}
                                </button> :
                                <button type="submit" className="btn btn-primary btn-sm mt-1" onClick={submitForm} disabled={inProgress}>
                                    {!inProgress ? 'Sign Up' : 'Progress...'}
                                </button>
                            }
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
