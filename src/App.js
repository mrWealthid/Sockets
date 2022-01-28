import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:7000');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    socket.on('message', (payload) => {
      setChat([...chat, payload]);
      console.log('Message recieved on server :', payload);
    });
  });

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    //send message on sockets

    socket.emit('message', { name: user, message: message });
  };
  return (
    <div className='App'>
      <div className='mario-chat'>
        <h2>Mario Chat</h2>
        <div className='chat-window'>
          <div className='output'>
            {chat.map((msg) => (
              <>
                <h4>{msg.name}</h4>
                <p>{msg.message}</p>
              </>
            ))}
          </div>
        </div>
        <input
          className='handle'
          type='text'
          placeholder='Handle'
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          className='message'
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Message'
        />
        <button onClick={sendMessage} className='send'>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
