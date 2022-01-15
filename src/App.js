import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import ChatWindow from './chat-window/ChatWindow';

import React, { useState } from 'react';

import './App.css';
import Login from './login/Login';
import { useStateValue } from './data-layer/StateProvider';


function App() {

  const [{ user }, dispatch] = useStateValue();

  return (
    
    <div className="App">
      {
        !user ? (
          <Login />
        ) : 
        (
          <div className = "App-body">
            <Sidebar />
            <Router>
              <Routes>
                <Route path="/rooms/:roomId" element={<ChatWindow />} />
                <Route path="/" element={<ChatWindow />} />
              </Routes>
            </Router>
          </div>          
        )
      }
    </div>
  );
}

export default App;
