import React, { Component } from 'react';

const apiUrl = "http://localhost:8081"
const perPage = 10

class Photos extends Component {

  state = {
    photos: [],
    totalCount: 0,
    page: 0,
    isLoading: false
  }

  deletePhoto = (id) => {
    console.log("deleting "+id , this.props.authToken)
    fetch(apiUrl + "/photos/"+id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.authToken,
        }
      });
 
    let photos = this.state.photos.filter(photo => {
      return photo.id !== id;
    })

    this.setState({
      photos: photos
    })
  }

  fetchPhotos = (authToken) => {
    let resource = "/photos?page="+this.state.page;
    fetch(apiUrl + resource, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken,
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log("done scrolling")
        let photos = [...this.state.photos, ...data.photos]
        this.setState({photos: photos, totalCount: data.total, isLoading: false})
        //console.log(JSON.stringify(data))
      });
  }

  onScroll = () => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
      this.state.totalCount/perPage > this.state.page+1 && !this.state.isLoading
    ) {
      console.log("scrolling page"+this.state.page);
      this.setState({ isLoading: true, page: this.state.page+1})
      this.fetchPhotos(this.props.authToken);
    }
  }

  componentDidMount() {
    console.log(this.props.authToken)
    if (this.props.authToken !== "") {
      this.fetchPhotos(this.props.authToken);
    }
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  render() {
    const photoList = this.state.photos.map(photo => {
      return (
        <div className="photoBox" key={ photo.id }>
          <img src={ photo.url } alt={photo.title} />
          <div>{ photo.title }</div>
          <button onClick={() => this.deletePhoto(photo.id)}>X</button>
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