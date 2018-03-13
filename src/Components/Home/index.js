import React from 'react';
import Header from '../Header';

const API_KEY = process.env.API_KEY;

const Home = () => (
  <div>
    <Header apiKey={API_KEY} />
  </div>
);

export default Home;
