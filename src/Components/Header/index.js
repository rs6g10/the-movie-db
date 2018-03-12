import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const TMDBLogo = 'https://www.themoviedb.org/static_cache/v4/logos/stacked-green-cae7a95e2590dbdde28284ac26245cb2792788838f5c498b892e8d01c183e6f3.svg';

const Header = () => (
  <div className="col-xs-12 header">
    <div className="row">
      <div className="col-xs-12 col-sm-6 col-lg-3">
        <Link to="/">
          <img src={TMDBLogo} className="logo" alt="The Movie Database" />
        </Link>
      </div>
    </div>
  </div>
);

export default Header;
