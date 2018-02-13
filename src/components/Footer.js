import React from 'react';
import Link from 'gatsby-link';
import FaTwitter from 'react-icons/lib/fa/twitter';

const Footer = () => (
    <section className="section footer">
      <div className="container">
        <div className="content">
          <p>Get the latest research, insights and jobs delivered to your inbox every week.</p>
          <form action="https://cell.us17.list-manage.com/subscribe/post?u=1eb30a522df43dfeeb91f54d2&amp;id=96fa9a2b9c" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
            <input type="email" className="input" placeholder="Your Email" name="EMAIL" id="mce-EMAIL" required  />
            <button type="submit" className="btn btn-success">SUBSCRIBE</button>
          </form>
        </div>
        <div className="dropUsALine">
          <p>
            Interested in learning more about CellAgri? <a href="">Drop us a line!</a>
          </p>
          <p>
            <FaTwitter/>
          </p>
          <p className="copywrite">
            Copyright 2017 CellAgri
          </p>
        </div>      
      </div>
    </section>
);

export default Footer;
