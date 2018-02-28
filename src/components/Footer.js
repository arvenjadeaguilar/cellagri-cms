import React from 'react';
import Link from 'gatsby-link';
import FaTwitter from 'react-icons/lib/fa/twitter';

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
              <a href="https://medium.com/cellagri" className="navbar-item">
                ARTICLES
              </a>
              <a href="/companies"  className="navbar-item">COMPANIES</a> 
              <a href="/jobs "  className="navbar-item">JOBS</a> 
              <a href="/contact" target="_top" className="navbar-item">
                CONTACT
              </a>
            </div>

          </div>
          </div>
        </div>
        <div className="dropUsALine">
          <p>
            Interested in learning more about CellAgri? <a href="">Drop us a line!</a>
          </p>
          
          <p className="copywrite">
            Copyright 2017 CellAgri
          </p>
          <p>
            <FaTwitter/>
          </p>
        </div>  
            
      </div>
      
    </section>
);

export default Footer;
