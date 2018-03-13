import React, { Component } from 'react';
import './styles.css';
import { convertToHollywoodMoney } from '../../utility';

let backdropImage;

class MovieInfo extends Component {
  componentDidUpdate() {
    document.body.style.backgroundImage = `url(${backdropImage})`;
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = '';
  }

  render() {
    const { data } = this.props;
    let posterIMG = `https://image.tmdb.org/t/p/w500${data.poster}`;
    let totalRevenue = data.revenue;
    const director = data.director && data.director.length > 0 ?
      data.director[0].name : '-';
    const stars = data.cast ? data.cast.map(x => x.name).join(', ') : '-';
    const noData = '-';
    backdropImage = `https://image.tmdb.org/t/p/original${data.backdrop}`;

    if (totalRevenue === 'undefined' || totalRevenue === 0) {
      totalRevenue = noData;
    } else {
      totalRevenue = convertToHollywoodMoney(data.revenue);
    }
    const runningTime = data.runtime ? `${data.runtime} mins` : '';

    if (data.poster == null) {
      posterIMG = 'https://i.imgur.com/dD0Zseb.png';
    }

    return (
      <div className="col-xs-12 movie-details">
        <div className="container row">
          <div
            className="poster-container col-xs-12 col-md-4 pull-md-8 col-lg-5 pull-lg-6"
          >
            <img
              id="poster"
              className="poster"
              src={posterIMG}
              alt="movie-poster"
            />
          </div>
          <div
            className="info-container col-xs-12 col-md-8 push-md-4 col-lg-7 push-lg-5"
          >
            <h1>{data.original_title}</h1>
            <span className="tagline">{data.tagline}</span>
            <p>{data.overview}</p>
          </div>
        </div>
        <div className="container">
          <div className="row info-container additional-info">
            <div className="col-sm-12">
              Director:
              <span className="meta-data-small">{director}</span>
            </div>
            <div className="col-sm-12">
              Stars:
              <span className="meta-data-small">{stars}</span>
            </div>
          </div>
          <div className="row info-container additional-info">
            <div className="col-sm-3">
              Rating:
              <span className="meta-data">{data.vote}</span>
            </div>
            <div className="col-sm-3">
              Released Date:
              <span className="meta-data">{data.release}</span>
            </div>
            <div className="col-sm-3">
              Running Time:
              <span className="meta-data">{runningTime}</span>
            </div>
            <div className="col-sm-3">
              Box Office:
              <span className="meta-data">{totalRevenue}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieInfo;
