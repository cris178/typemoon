import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
     <nav>
        <div className="logo">TypeMoon</div>
     </nav>
     <div className="container">
        <div className="submissionArea border-left border-right">
          <div className="submitPost">
            <input type="text" className="post" placeholder="What's happening"/>
            <hr></hr>
          </div>
        </div>
       
     </div>
     

    </div>
  );
}

export default App;
