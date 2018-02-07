import React from 'react';
import Link from 'gatsby-link';

import github from '../img/github-icon.svg';
import logo from '../img/logo@1x.png';

const Navbar = () => (
  <div className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src={logo} alt="Kaldi"  />
        </Link>
      </div>
      
    </div>
  </div>
);

export default Navbar;
