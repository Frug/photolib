import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'

class Auth extends Component {

  render() {
    const { authToken, handleLogout } = this.props;

    const titleBar = authToken == null ? (
      <a href="http://localhost:8081/login">Login with Github</a>
    ) : (
      <Link to="/logout" onClick={handleLogout}>Logout</Link>
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