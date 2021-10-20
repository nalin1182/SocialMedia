import React, { useEffect, useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getAllUsers, getAllFriends, addFriend, removeFriend } from '../actions/friends'
import Chat from './Chat';

const Users = () => {
    const dispatch = useDispatch();
    const openChat = useRef(null);

    const { Users, Friends } = useSelector((state) => state.friends);
    const { profile } = useSelector((state) => state.auth);
    const [showfriendList, setShowfriendList] = useState(false);

    //for chating engine
    const [receiver, setReceiver] = useState('');
    const [room, setRoom] = useState('');

    const outLineButton = 'btn btn-sm btn-outline-primary mx-1';
    const solidButton = 'btn btn-sm btn-primary mx-1';

    let List = showfriendList ? Friends : Users.filter((user) => (user.friends.findIndex((val) => val.toString() === profile.id.toString())) === -1);


    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllFriends());// eslint-disable-next-line        
    }, [])

    const handelRemoveFriend = (id) => {
        dispatch(removeFriend(id));
    }

    const handeladdFriend = (id) => {
        dispatch(addFriend(id));
    }

    const handelchat = (email, name) => {

        let roomId = [email, profile.email];
        roomId.sort();
        setReceiver(name);
        setRoom(roomId.join());


        let temp = openChat.current;
        // div.scrollHeight - div.clientHeight
        console.log(temp.getBoundingClientRect());
        window.scrollBy(0,temp.getBoundingClientRect().bottom);

        
    }

    return (
        <>
            <div className="card userCard" ref = {openChat}>
                <div className="card-header">
                    <button type="submit" className={!showfriendList ? solidButton : outLineButton} onClick={() => setShowfriendList(!showfriendList)}>All Users</button>
                    <button type="submit" className={showfriendList ? solidButton : outLineButton} onClick={() => setShowfriendList(!showfriendList)}>All Friends</button>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {List?.map((user, i) => (
                            <li className="list-group-item d-flex justify-content-between" key={i}>
                                <span>{user.username.toUpperCase()}</span>
                                {showfriendList ?
                                    <div>
                                        <i className="fas fa-comments mx-1" onClick={() => handelchat(user.email, user.username)}></i>
                                        <button type="submit" className="btn btn-primary btn-sm mx-1" onClick={() => handelRemoveFriend(user._id)}>Remove</button>
                                    </div> :
                                    <button type="submit" className="btn btn-primary btn-sm mx-1" onClick={() => handeladdFriend(user._id)}>Add Friend</button>}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {room && <Chat receiver={receiver} room={room} />}
        </>

    )
}

export default Users
