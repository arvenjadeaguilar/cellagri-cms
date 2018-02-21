import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';
import Navbar from '../components/Navbar';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaLinkedIn from 'react-icons/lib/fa/linkedin';
import FaInstagram from 'react-icons/lib/fa/instagram';
import FaGlobe from 'react-icons/lib/fa/globe';
import Footer from '../components/Footer';

let getIcon=(media)=>{
  if(media == 'Twitter'){
    return <FaTwitter />
  }
  if(media == 'Facebook'){
    return <FaFacebook />
  }
  if(media == 'LinkedIn'){
    return <FaLinkedIn />
  }
  if(media == 'Instagram'){
    return <FaTwitter />
  }
}
export const JobsPostTemplate = ({ title, logo, jobs, website,thumbnail, content, description, socialMedia, contentComponent }) => {
  const PageContent = contentComponent || Content;

  let mediaJSX = socialMedia && socialMedia.map(media=>{
    return (
      <a href={media.url} className="media inline">
        {getIcon(media.media)} {media.media}
      </a>
    );
  });
  return (
    <section className="section company">
      <Navbar color="#2B3D54"/>
      <div className="container">
        <div className="section">
          <div className="header">
            <img className="logo" src={logo} alt={"logo"}/>
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h1>
          </div>
          <p >{description}</p>
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default ({ data }) => {
  const { markdownRemark: post } = data;
  console.log(post.frontmatter);
  
  return (<JobsPostTemplate
    contentComponent={HTMLContent}
    title={post.frontmatter.position}
    description={post.frontmatter.description}
  />);
};

export const jobsPostQuery = graphql`
  query JobsPost($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        position
        location
        description
      }
    }
  }
`;
