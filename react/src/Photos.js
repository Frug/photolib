import React, { Component } from 'react';

class Photos extends Component {
  render() {
    const { photos } = this.props;

    const photoList = photos.map(photo => {
      return (
        <div className="photoBox" key={ photo.id }>
          <div>{ photo.url }</div>
          <div>{ photo.title }</div>
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