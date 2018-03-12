import React from 'react';
import Header from '../Header';

const API_KEY = process.env.API_KEY;

const Home = () => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-lg-10 offset-lg-1">
        <Header apiKey={API_KEY} />
      </div>
    </div>
  </div>
);

export default Home;
