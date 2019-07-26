import React from 'react';
import Header from './components/Header/index';
import Main from './pages/main/index';
import './style.css';
import Routes from './routes.js';




const App = () => (
  <div className="App">
    <Header /> 
    <Routes />
  </div>
)

export default App;
