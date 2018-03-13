import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import MovieInfo from '../MovieInfo';
import { parseResponse } from '../../utility';

import './styles.css';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      showSearchResults: true,
    };
  }

  componentDidMount() {
    const movieId = this.props.match.params.movieId;
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.props.apiKey}`;
    const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.props.apiKey}`;
    const movieVideoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${this.props.apiKey}`;
    this.fetchMovieDetails(movieUrl);
    this.fetchMovieCredits(movieCreditsUrl);
    this.fetchMovieVideos(movieVideoUrl);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showSearchResults: true });
    if (this.props.match.params.movieId !== nextProps.match.params.movieId) {
      const movieId = nextProps.match.params.movieId;
      const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.props.apiKey}`;
      const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.props.apiKey}`;
      const movieVideoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${this.props.apiKey}`;
      this.fetchMovieDetails(movieUrl);
      this.fetchMovieCredits(movieCreditsUrl);
      this.fetchMovieVideos(movieVideoUrl);
    }
  }

  fetchMovieDetails(url) {
    this.setState({ loading: false, error: null });
    fetch(url).then(res => parseResponse(res)).then((datum) => {
      const data = datum.results ? datum.results[0] : datum;
      if (data && data.id) {
        this.setState({
          loading: false,
          movieID: data.id,
          original_title: data.original_title,
          tagline: data.tagline,
          overview: data.overview,
          homepage: data.homepage,
          poster: data.poster_path,
          production: data.production_companies,
          production_countries: data.production_countries,
          genre: data.genres,
          release: data.release_date,
          vote: data.vote_average,
          runtime: data.runtime,
          revenue: data.revenue,
          backdrop: data.backdrop_path,
          showSearchResults: false,
          error: null,
        });
      }
    }).catch((err) => {
      this.setState({ loading: false, error: err });
    });
  }

  fetchMovieCredits(url) {
    fetch(url).then(res => parseResponse(res)).then((datum) => {
      if (datum) {
        this.setState({
          loading: false,
          error: null,
          cast: datum.cast ? datum.cast.splice(0, 5) : [],
          director: datum.crew ?
            datum.crew.filter(d => d.job.toLowerCase() === 'director') :
            [],
        });
      }
    }).catch((err) => {
      this.setState({ loading: false, error: err });
    });
  }

  fetchMovieVideos(url) {
    fetch(url).then(res => parseResponse(res)).then((data) => {
      if (data && data.results && data.results.length > 0) {
        if (data.results[0].site && data.results[0].site.toLocaleLowerCase() === 'youtube') {
          this.setState({
            videoKey: data.results[0].key,
            videoName: data.results[0].name,
          });
        }
      }
    }).catch((err) => {
      this.setState({ loading: false, error: err });
    });
  }

  render() {
    const state = this.state;
    return (
      <div>
        <Header showResults={state.showSearchResults} apiKey={this.props.apiKey} />
        {state.error &&
        <div className="row">
          <span className="error">{state.error.message}</span>
        </div>
        }
        {!state.error && state && <MovieInfo data={state} />}
      </div>
    );
  }
}

Movie.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default Movie;
