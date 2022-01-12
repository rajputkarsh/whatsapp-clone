
import './App.css';

import Sidebar from './sidebar/Sidebar';
import ChatWindow from './chat-window/ChatWindow';

function App() {
  return (
    <div className="App">
      
      <div className="App-body">        
        <Sidebar />  
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;
