import React, { Component } from 'react';
import Photos from './Photos.js'

class App extends Component {
  state = {
    photos: [
      { 'url':'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png', title:"g", id:1},
      { 'url':'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png', title:"g", id:2},
      { 'url':'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png', title:"g", id:3},
      { 'url':'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png', title:"g", id:4}
    ]
  }
  render() {
    return (
      <div className="App">
        <Photos photos={this.state.photos} />
      </div>
    );
  }
}

export default App;
