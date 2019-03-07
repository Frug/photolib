import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Auth extends Component {

  render() {
    const { authToken, handleLogout } = this.props;

    let menu = authToken == null ? (
      <ul className="right">
        <li><a href="http://localhost:8081/login">Login with Github</a></li>
      </ul>
    ) : (
      <ul className="right">
        <li><a href="/logout">Logout</a></li>
        <li><NavLink to="/photos">Photos</NavLink></li>
        <li><NavLink to="/add">Add Photo</NavLink></li>
      </ul>
    )

    return(
      <nav className="nav-wrapper grey lighten-1">
        <div className="container">
            {menu}
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authToken: state.authToken 
  }
}

export default connect(mapStateToProps)(Auth)