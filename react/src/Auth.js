import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Auth extends Component {

  render() {
    const { authToken, handleLogout } = this.props;

    const titleBar = authToken == null ? (
      <a href="http://localhost:8081/login">Login with Github</a>
    ) : (
      <a href="http://localhost:8080/logout" onClick={handleLogout}>Logout</a>
    )

    return(
      <nav className="nav-wrapper grey lighten-1">
        <div className="container">
          <ul className="right">
            <li>{ titleBar }</li>
            <li><NavLink to="/photos">Photos</NavLink></li>
            <li><NavLink to="/add">Add Photo</NavLink></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Auth 