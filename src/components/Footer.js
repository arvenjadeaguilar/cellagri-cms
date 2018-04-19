import React from 'react';
import Link from 'gatsby-link';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaFacebook from 'react-icons/lib/fa/facebook-square';
import FaMedium from 'react-icons/lib/fa/medium';

const Footer = () => (
    <section className="section footer">
      <div className="container">
        <div className="content">
          <form action="https://cell.us17.list-manage.com/subscribe/post?u=1eb30a522df43dfeeb91f54d2&amp;id=96fa9a2b9c" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
            <input type="email" className="input" placeholder="Your Email" name="EMAIL" id="mce-EMAIL" required  />
            <button type="submit" className="btn btn-success">SUBSCRIBE</button>
          </form>
        </div>
        <div className="dropUsALine">
          <p><b>Our Newsletter</b> – Get the latest research, insights and jobs delivered to your inbox every week.</p>
        </div>  
      </div>
      <hr/>
      <div className="container footerNav">
        <div className="content">
          <div className="navbar-footer">
          <div className="navbar-brand">
            <div className="nav">
              <Link to="/articles" className="navbar-item">
                ARTICLES
              </Link>
              <Link to="/companies" className="navbar-item">
                COMPANIES
              </Link>
              <Link to="/jobs" className="navbar-item">
                JOBS
              </Link>
              <Link to="/contact" className="navbar-item">
                CONTACT
              </Link>
            </div>

          </div>
          </div>
        </div>
        <div className="dropUsALine">
          <p>
            Interested in learning more about CellAgri? <Link to="/contact">Drop us a line!</Link>
          </p>
          
          <p className="copywrite">
            Copyright 2018 CellAgri
          </p>
          <p className="socialIcons">
            <a href="https://twitter.com/cellagritech/" className="icon">
              <FaTwitter/>
            </a>
            <a href="https://www.facebook.com/cellagri/" className="icon">
              <FaFacebook/>
            </a>
            <a href="https://medium.com/cellagri" className="icon">
              <FaMedium/>
            </a>
          </p>
        </div>  
      </div>
    </section>
);

export default Footer;
