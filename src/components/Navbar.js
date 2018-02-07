import React from 'react';
import Link from 'gatsby-link';

import github from '../img/github-icon.svg';
import logo from '../img/logo@1x.png';

const Navbar = () => (
  <div className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src={require('../img/cellagri-logo@1x.png')}  srcSet={`${require('../img/cellagri-logo@1x.png')} 1x, ${require('../img/cellagri-logo@2x.png')} 2x`} alt="Cell Agri"  />
        </Link>
        <div className="nav">
          <Link to="/" className="navbar-item">
            Articles
          </Link>
          <Link to="/" className="navbar-item">
            Contact
          </Link>
        </div>

      </div>
      <div className="navbar-brand-mobile">
        <Link to="/" className="navbar-item">
          <img src={logo} alt="Cell Agri"  />
        </Link>
        
      </div>
    </div>
  </div>
);

export default Navbar;
