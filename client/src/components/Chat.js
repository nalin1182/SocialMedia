import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import Chatbox from './Chatbox';

let socket;

const Chat = ({ receiver, room }) => {

    const { profile } = useSelector((state) => state.auth);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:8000';

    useEffect(() => {
        console.log(receiver + " " + room);
        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

        socket.emit('join', { receiver, room }, () => {

        });

        socket.on('message', (message) => {
            if (message) {
                setMessages(messages => [ ...messages, message ]);
            }
        })

        return () => {
            // console.log('hi');
            setMessages([])
            socket.disconnect();
        }
    }, [room, receiver])

    const sendMessage = (e) => {

        e.preventDefault();

        let sender = profile.name;
    
        if (message) {
            socket.emit('sendMessage', { message, room, sender }, () => {
                setMessage('');
            })
        }

    }

    return (

        <Chatbox
            receiver={receiver} 
            setMessage={setMessage}
            sendMessage={sendMessage}
            message={message}
            messages={messages}
            currentUser={profile.name} />

    )
}

export default Chat
