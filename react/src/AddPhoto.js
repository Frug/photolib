
import React, { Component } from 'react';

class AddPhoto extends Component {

  state = {
    url: '',
    title: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value  
    })
  } 
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addPhoto(this.state);
    this.setState({
      url: '', title: '' 
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="url">Url:</label>
          <input type="text" id="url" onChange={this.handleChange} value={this.state.url} />
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" onChange={this.handleChange} value={this.state.title} />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default AddPhoto