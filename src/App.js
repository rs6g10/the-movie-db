import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Components/Home';
import Movie from './Components/Movie';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route strict path="/movie/:movieId" component={Movie} />
    </div>
  </Router>
);

export default App;
