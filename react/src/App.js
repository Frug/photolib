import React, { Component } from 'react';
import Photos from './Photos.js'
import Auth from './Auth.js'
import AddPhoto from './AddPhoto.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class App extends Component {
  state = {
    authToken: null,
    photos: []
  }

  addPhoto = (photo) => {
    photo.id = Math.random();
    console.log("adding via API", photo)
    let photos = [...this.state.photos, photo]
    this.setState({
        photos: photos, 
        authToken: this.state.authToken
    })
  }

  handleLogout = () => {
    let authToken = null;
    this.setState({authToken});
  }

  componentDidMount() {
    //getAuth();
  }

  render() {
    console.log(this.props)

    return (
      <Router>
        <div className="photo-app container">
          <Auth authToken={this.state.authCode} handleLogout={this.handleLogout} />
          <Route path="/add" render={()=><AddPhoto addPhoto={this.addPhoto} />}/>
          <Route path="/photos" render={()=><Photos photos={this.state.photos} authToken={this.state.authToken} deletePhoto={this.deletePhoto}/>}/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authToken: state.authToken 
  }
}
 
const mapDispatchToProps = (dispatch) => {
  return {
    setAuthToken: (authToken) => { dispatch({type: 'LOGIN', authToken: authToken })}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);