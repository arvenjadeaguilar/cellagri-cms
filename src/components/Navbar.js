import React from 'react';
import Link from 'gatsby-link';

import github from '../img/github-icon.svg';
import logo from '../img/logo@1x.png';
import Bars from 'react-icons/lib/fa/bars';
import Modal from 'react-modal';
import FaClose from 'react-icons/lib/md/close';

const customStyles = {
  content : {
    top                   : '0',
    left                  : '0',
    right                 : '0',
    bottom                : '0',
    marginRight           : '0',
    backgroundColor       : '#fff'
  }
};

const keys = {37: 1, 38: 1, 39: 1, 40: 1};


class Navbar extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.disableScroll();
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.enableScroll();
    this.setState({modalIsOpen: false});
  }

  preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;  
  }
  
  preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      this.preventDefault(e);
      return false;
    }
  }
  
  disableScroll() {
    if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', this.preventDefault, false);
    window.onwheel = this.preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
    window.ontouchmove  = this.preventDefault; // mobile
    document.onkeydown  = this.preventDefaultForScrollKeys;
  }
  
  enableScroll() {
    if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
  }

  render() {
    return (
      <div className="navbar is-transparent">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src={require('../img/cellagri-logo@1x.png')}  srcSet={`${require('../img/cellagri-logo@1x.png')} 1x, ${require('../img/cellagri-logo@2x.png')} 2x`} alt="Cell Agri"  />
            </Link>
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
          <div className="navbar-brand-mobile">
            <Link to="/" className="navbar-item">
              <img src={logo} alt="Cell Agri"  />
            </Link>
            <div className="hamburger" onClick={()=>this.openModal()}>
              <Bars/>
            </div>
          </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            ariaHideApp={false}
            contentLabel="Example Modal"
          >
            <div className="navMobile">
              <div className="closeIcon" onClick={()=>this.closeModal()}>
                <FaClose/>
              </div>
              <Link to="/articles" className="navItem">
                ARTICLES
              </Link>
              <Link to="/companies" className="navItem">
                COMPANIES
              </Link>
              <Link to="/jobs" className="navItem">
                JOBS
              </Link>
              <Link to="/contact" className="navItem">
                CONTACT
              </Link>
            </div>
            
            
          </Modal>
        </div>
      </div>
    );
  }
}

export default Navbar;
