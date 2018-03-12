import React, { Component } from 'react';

const key = process.env.API_KEY;

class Movie extends Component {
  render() {
    const { params } = this.props.match;
    const movieId = params ? params.movieId : -1;
    return (
      <div>
        Movie #{movieId}
      </div>
    );
  }
}

export default Movie;