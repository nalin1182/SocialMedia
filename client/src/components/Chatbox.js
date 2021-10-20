import React,{useEffect, useRef} from 'react'

const Chatbox = ({ setMessage, sendMessage, message, messages, currentUser,receiver}) => {

    const messageEl = useRef(null);

    useEffect(() => {
        if (messageEl) {
          messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, [])

    const handelkeyPress = (e) => {

        if (e.key === 'Enter') {
            sendMessage(e);
            setMessage('');

        }
    }

    const handelChange = (e) => {
        setMessage(e.target.value);
    }


    return (
        <div className="card chatbox my-3">
            <div className="card-header">
                {receiver.toUpperCase()}
            </div>
            <div className="card-body chatboxInner" ref={messageEl}>
                <ul className="list-group">
                    {messages?.map((message, i) => (message.user === currentUser ?
                        <li key={i} className="list-group-item text-end">{message.text}</li>
                        : <li key={i} className="list-group-item">{message.text}</li>))}
                </ul>
            </div>
            <form>
                <div>
                    <input
                        className="form-control"
                        value={message}
                        onChange={handelChange}
                        onKeyPress={handelkeyPress}
                        placeholder="Send message..."
                    />
                </div>
            </form>





        </div>
    )
}

export default Chatbox
