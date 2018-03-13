import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import LandingPage from '../LandingPage';

const Home = ({ apiKey }) => (
  <div>
    <Header apiKey={apiKey} />
    <LandingPage apiKey={apiKey} />
  </div>
);

Home.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default Home;
