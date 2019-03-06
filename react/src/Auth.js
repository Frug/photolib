import React, { Component } from 'react';

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
          </ul>
        </div>
      </nav>
    )
  }
}

export default Auth 