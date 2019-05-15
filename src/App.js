import React from 'react';
import './App.css';
import { Switch, Route,Redirect } from "react-router-dom";
import Home from './components/home';
import Navbar from './components/navbar';
import Login from './components/login';
import Register from './components/register';
import Chat from './components/chat';

function App() {
  return (
    <div>
    <Navbar />
    <div className="container-fluid">
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/chat" component={Chat} />
        <Redirect from="/" to="/home" component={Home}/>
      </Switch>
    </div>
    </div>
  );
}

export default App;
