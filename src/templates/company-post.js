import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';
import Navbar from '../components/Navbar';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaGlobe from 'react-icons/lib/fa/globe';
import Footer from '../components/Footer';

export const CompanyPageTemplate = ({ title,logo,jobs,thumbnail, content,description, contentComponent }) => {
  const PageContent = contentComponent || Content;
  return (
    <section className="section company">
      <Navbar color="#2B3D54"/>
      <div className="container">
        <div className="section">
          <div className="header">
            <img className="logo" src={logo} alt={"logo"}/>
            <div className="socialMedia">
              <div className="media inline">
                <FaGlobe /> Website
              </div>
              <div className="media inline">
                <FaTwitter /> Twitter
              </div>
            </div>
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h1>
          </div>
          <p>{description}</p>
        </div>
        <div className="section">
          <div className="job-containers">
            <div className="jobs">
              <h2>Jobs at {title.toLowerCase()}</h2> 
              <div className="job-list">
                {jobs ? jobs.map(job => (
                  <div className="item">
                    <img className="item-logo" src={thumbnail} alt={"logo"}/>
                    <h3 className="title">{job.position}</h3>
                    <div className="inline">
                      <h3>{title}</h3>
                      <span>{job.location}</span>
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
        jobs {
          position
          location
        }
        thumbnail
      }
    }
  }
`;
