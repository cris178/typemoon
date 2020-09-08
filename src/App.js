import React from 'react';
import logo from './logo.svg';
import './App.css';
import Submit from './components/submit/submit'

function App() {
  return (
    <div className="App">
     <nav>
        <div className="logo">TypeMoon</div>
     </nav>
     <div className="container">
        <div className="timeline">
              <Submit />
          </div>
     </div>
     

    </div>
  );
}

export default App;
