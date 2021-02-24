import React, { useRef } from 'react';
import io from "socket.io-client";
import Main from './Main'
import './App.css';


function App() {
  const { current: socket } = useRef(io("http://127.0.0.1:8000/room"));

  return (
    <div className="App">
      <Main socket={socket} />
    </div>
  );
}

export default App;
