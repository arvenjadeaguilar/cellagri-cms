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
export const CompanyPostTemplate = ({ title, logo, jobs,location, website,thumbnail, content, description, socialMedia, contentComponent }) => {
  const PageContent = contentComponent || Content;

  let mediaJSX = socialMedia && socialMedia.map(media=>{
    return (
      <a href={media.url} key={media.media} className="media inline">
        {getIcon(media.media)} {media.media}
      </a>
    );
  });
  return (
    <section className="section company">
      <Navbar color="#2B3D54"/>
        <div className="section container">
          <div className="company-header">
            <div className="logo_container">
              <img className="logo" src={logo} alt={"logo"}/>
              <h1 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h1>
            </div>
            <div className="desc_container">
              <p className="description" >{description}</p>
              <div className="socialMedia">
                <a href={"//"+website} className="media inline">
                  <FaGlobe /> Website
                </a>
                {mediaJSX}
              </div>
            </div>
            
          </div>
        </div>
        <div className="section container-fluid">
          <div className="job-containers">
            <div className="jobs">
              <h2>Jobs at {title}</h2> 
              <div className="job-list">
                {jobs ? jobs.map(job => (
                  <div key={job.position} className="item">
                    <img className="item-logo" src={thumbnail} alt={"logo"}/>
                    <h3 className="title"><a href={job.node.frontmatter.path}>{job.node.frontmatter.position && job.node.frontmatter.position.toUpperCase()}</a></h3>
                    <div className="inline">
                      <span className="location">{location}</span>
                    </div>
                    <div className="item-date">
                      {job.node.frontmatter.date}
                    </div>
                  </div>
                )):null}

                {
                  !jobs || (jobs && jobs.length) == 0?
                  <div className="empty">
                    <h3 className="title">No Jobs Posted</h3>
                  </div>:null
                }
              </div>
            </div>
          </div>
        </div>
      <Footer/>
    </section>
  );
};

export default ({ data }) => {
  const { markdownRemark: post, } = data;
  const { edges: posts } = data.allMarkdownRemark?data.allMarkdownRemark:[];

  return (<CompanyPostTemplate
    contentComponent={HTMLContent}
    title={post.frontmatter.title}
    description={post.frontmatter.description}
    logo={post.frontmatter.logo}
    location={post.frontmatter.location}
    jobs={posts}
    website={post.frontmatter.website}
    socialMedia={post.frontmatter.socialMedia}
    thumbnail={post.frontmatter.thumbnail}
  />);
};

export const companyPostQuery = graphql`
  query CompanyPost($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        description
        logo
        website
        location
        socialMedia {
          media
          url
        }
        
        thumbnail
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] },filter: {frontmatter: {companyRelated:{eq:$path}}}) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            path
            position
            location
            description
            date(formatString: "MMM DD")
          }
        }
      }
    }
  }
`;
