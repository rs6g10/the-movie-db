import React from 'react';
import PropTypes from 'prop-types';

import ReactPlayer from 'react-player';

const Video = ({ videoKey }) => (
  <ReactPlayer url={`https://www.youtube.com/watch?v=${videoKey}`} controls />
);

Video.propTypes = {
  videoKey: PropTypes.string,
};

export default Video;
