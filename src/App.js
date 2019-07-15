import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CreateParkReserve from './views/CreateParkReserve'
import Home from './views/Home'
import UserPage from './views/UserPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={Home} />
        <Route path='/create/:date' component={CreateParkReserve} />
        <Route path='/user/:id' component={UserPage} />
      </div>
    </Router>
  );
}

export default App;
