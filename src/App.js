import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Home';
import Movie from './Components/Movie';

const API_KEY = process.env.API_KEY || 'mysuperdupersecretkey';

const HomeWithApiKey = props => (
  <Home apiKey={API_KEY} {...props} />
);

const MovieWithApiKey = props => (
  <Movie apiKey={API_KEY} {...props} />
);

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={HomeWithApiKey} />
      <Route strict path="/movie/:movieId" component={MovieWithApiKey} />
    </div>
  </Router>
);

export default App;
