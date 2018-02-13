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
export const CompanyPageTemplate = ({ title, logo, jobs, website,thumbnail, content, description, socialMedia, contentComponent }) => {
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
            <div className="socialMedia">
              <a href={website} className="media inline">
                <FaGlobe /> Website
              </a>
              {mediaJSX}
            </div>
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h1>
          </div>
          <p >{description}</p>
        </div>
        <div className="section">
          <div className="job-containers">
            <div className="jobs">
              <h2>Jobs at {title && title.toLowerCase()}</h2> 
              <div className="job-list">
                {jobs ? jobs.map(job => (
                  <div className="item">
                    <img className="item-logo" src={thumbnail} alt={"logo"}/>
                    <h3 className="title">{job.position}</h3>
                    <div className="inline">
                      <h3>{title}</h3>
                      <span className="location">{job.location}</span>
                    </div>
                    <div className="item-date">
                      Feb 2
                    </div>
                  </div>
                )):null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default ({ data }) => {
  const { markdownRemark: post } = data;
  console.log(post.frontmatter);
  
  return (<CompanyPageTemplate
    contentComponent={HTMLContent}
    title={post.frontmatter.title}
    description={post.frontmatter.description}
    logo={post.frontmatter.logo}
    jobs={post.frontmatter.jobs}
    website={post.frontmatter.website}
    socialMedia={post.frontmatter.socialMedia}
    thumbnail={post.frontmatter.thumbnail}
  />);
};

export const companyPageQuery = graphql`
  query CompanyPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        description
        logo
        website
        socialMedia {
          media
          url
        }
        jobs {
          position
          location
        }
        thumbnail
      }
    }
  }
`;
