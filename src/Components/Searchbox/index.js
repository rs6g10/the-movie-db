import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import { parseResponse } from '../../utility';

import './styles.css';

class Searchbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      searchResults: null,
      valueInput: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showResults !== nextProps.showResults) {
      this.setState({
        searchResults: nextProps.showResults ? this.state.searchResults : null,
      });
    }
  }

  onChange(event) {
    const value = event.target.value;
    if (value.length > 0) {
      this.fetchData(value);
    } else {
      this.setState({
        searchResults: null,
      });
    }
  }

  displayResultArray(data) {
    return this.generateResults(data);
  }

  fetchData(query) {
    const that = this;
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${this.props.apiKey}`;
    this.setState({
      loading: true,
      error: null,
    });
    fetch(url).then(res => parseResponse(res)).then((data) => {
      if (data && data.results) {
        that.setState({
          searchResults: data.results,
          loading: false,
          error: null,
        });
      }
    }).catch((err) => {
      this.setState({
        error: err,
        loading: false,
      });
    });
  }

  generateResults(data) {
    if (data && data.length > 0) {
      return (
        <ul>
          {
            data.map(datum => (
              <li
                key={datum.id}
                className={
                  ClassNames('search-box_item',
                    { selected: datum.selected },
                    { disable: datum.disable },
                    { hidden: datum.hidden })}
              >
                <Link to={`/movie/${datum.id}`}>
                  {datum.title}
                </Link>
              </li>
            ))
          }
        </ul>
      );
    }
    return null;
  }

  render() {
    const { placeHolder } = this.props;
    const { searchResults, loading, error } = this.state;
    return (
      <div className={ClassNames('search-box', { open: !!searchResults })}>
        <div className="search-box_content">
          <input
            type="text"
            className="search-box_input"
            placeholder={placeHolder}
            onChange={this.onChange}
          />
          <div className="search-box_dropdown">
            {loading && <span>Loading...</span>}
            {!!searchResults && !loading && !error &&
            this.displayResultArray(searchResults)}
            {error &&
            <div className="row">
              <span className="error">{error.message}</span>
            </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Searchbox.propTypes = {
  apiKey: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  showResults: PropTypes.bool,
};

Searchbox.defaultProps = {
  placeHolder: 'Search',
  showResults: true,
};

export default Searchbox;
