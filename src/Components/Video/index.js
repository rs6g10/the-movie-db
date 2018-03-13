import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import ReactPlayer from 'react-player';

const Video = ({ videoKey }) => (
  <div className="player-wrapper">
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${videoKey}`}
      className="video-player"
      controls
      width='100%'
      height='100%'
    />
  </div>
);

Video.propTypes = {
  videoKey: PropTypes.string,
};

export default Video;
