import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { parseResponse } from '../../utility';

import './styles.css';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      results: null,
      selectedCategory: 'now_playing',
    };
    this.selectCategory = this.selectCategory.bind(this);
  }

  componentDidMount() {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.props.apiKey}`;
    this.fetchApi(url);
  }

  selectCategory(key) {
    this.setState({ selectedCategory: key });
    const url = `https://api.themoviedb.org/3/movie/${key}?api_key=${this.props.apiKey}`;
    this.fetchApi(url);
  }

  fetchApi(url) {
    this.setState({ loading: true });
    fetch(url).then(res => parseResponse(res)).then((datum) => {
      if (this.refs.moviesGrid) {
        this.setState({ loading: false, error: null });
        if (datum.results.length > 0) {
          this.setState({
            results: datum.results,
          });
        }
      }
    }).catch((err) => {
      this.setState({
        error: err,
        loading: false,
      });
    });
  }

  render() {
    const selectedCategory = this.state.selectedCategory;
    return (
      <div>
        <div className="welcome-categories">
          {this.props.categories.map(category => (
            <div
              className={classnames(category.key, 'welcome-category',
                selectedCategory === category.key ? 'active' : '')}
              onClick={() => this.selectCategory(category.key)}
              aria-hidden
              key={`category-${category.key}`}
            >{category.title}</div>
          ))
          }
        </div>
        <div className="movies-grid" ref="moviesGrid">
          {this.state.loading &&
          <div className="row">
            <span className="loading">Loading...</span>
          </div>}
          {!this.state.loading && !this.state.error &&
          this.state.results && this.state.results.map(result => (
            <Link to={`/movie/${result.id}`} key={`link-${result.id}`}>
              <div
                className="movie-container relative"
                key={`container-${result.id}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  alt="movie-poster"
                />
                <div className="movie-info">
                  <div className="release_date">{result.release_date}</div>
                  <div className="movie_title">{result.title}</div>
                </div>
              </div>
              <div className="vote">
                <span role="img"
                      aria-label="star">⭐</span> {result.vote_average}
              </div>
            </Link>
          ))}
          {this.state.error &&
          <div className="row">
            <span className="error">{this.state.error.message}</span>
          </div>}
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  categories: PropTypes.array,
  apiKey: PropTypes.string.isRequired,
};

LandingPage.defaultProps = {
  categories: [
    { title: 'Now Showing', key: 'now_playing' },
    { title: 'Upcoming', key: 'upcoming' },
    { title: 'Popular', key: 'popular' },
  ],
};

export default LandingPage;

