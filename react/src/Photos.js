import React, { Component } from 'react';

class Photos extends Component {
  render() {
    const { photos, deletePhoto } = this.props;

    const photoList = photos.map(photo => {
      return (
        <div className="photoBox" key={ photo.id }>
          <div>{ photo.url }</div>
          <div>{ photo.title }</div>
          <button onClick={() => deletePhoto(photo.id)}>X</button>
        </div>
      ) 
    })

    return(
      <div className="photos">
        { photoList }
      </div>
    )
  }
}

export default Photos