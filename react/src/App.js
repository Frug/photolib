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
        photos: photos 
    })
  }
  deletePhoto = (id) => {
    let photos = this.state.photos.filter(photo => {
      return photo.id !== id;
    })

    this.setState({
      photos: photos
    })
  }
  handleLogout = () => {
    let authToken = null;
    this.setState({authToken});
  }

  render() {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let authCode = params.get('code');

    return (
      <Router>
        <div className="photo-app container">
          <Auth authToken={authCode} handleLogout={this.handleLogout} />
          <Route path="/add" render={()=><AddPhoto addPhoto={this.addPhoto} />}/>
          <Route path="/photos" render={()=><Photos photos={this.state.photos} deletePhoto={this.deletePhoto}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
