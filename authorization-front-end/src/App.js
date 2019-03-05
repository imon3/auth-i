import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';


import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UsersPage from './components/UsersPage';

class App extends Component {

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/api/login'>Login</NavLink>
          <NavLink to='/api/register'>Register</NavLink>
          <NavLink to='/api/users'>Users</NavLink>
        </nav>

        <Route exact path='/' Component={HomePage} />
        <Route path='/api/login' Component={LoginPage} />
        <Route path='/api/register' Component={RegisterPage} />
        <Route path='/api/users' Component={UsersPage} />
      </div>
    );
  }
}

export default App;
