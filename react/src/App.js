import React, { Component } from 'react';
import Photos from './Photos.js'
import Auth from './Auth.js'
import AddPhoto from './AddPhoto.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  state = {
    authToken: null,
    photos: [
      { 'url':'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png', title:"g", id:1},
      { 'url':'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png', title:"g2", id:2},
      { 'url':'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png', title:"g3", id:3},
    ]
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

  // This effectively only mounts after a login comes from github
  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let authCode = params.get('code');
    if (authCode !== "") {
      this.setState({authCode: authCode});
    }
  }

  render() {
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

export default App;
