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
import find from 'lodash/find';

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
export const JobsPostTemplate = ({ title, logo,company, jobs, website,thumbnail, content, description, socialMedia, contentComponent }) => {
  const PostContent = contentComponent || Content;

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
            <div className="header-label">JOB LISTING</div>
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h1>
            <div className="header-company">
              <div className="thumbnail">
                <img src={company.node.frontmatter.thumbnail} alt="logo"/>
              </div>
              <div className="title">
                {company.node.frontmatter.title}
              </div>
              <div className="companymedia">
                <a href={website} className="media inline">
                  <FaGlobe /> Website
                </a>
                {mediaJSX}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="container-fluid">
        <div className="jobDescription">
          <div className="jobPanelDesc">
            <PostContent content={description} />
            <div className="jobDescriptionsFooter">
              <div>Sounds interesting?</div>
              <button className="btn btn-success">APPLY FOR THIS JOB</button>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </section>
  );
};

export default ({ data }) => {
  const { markdownRemark: post,allMarkdownRemark:companies } = data;
  let company = find(companies.edges,(item)=>{
    return item.node.frontmatter.path == post.frontmatter.companyRelated;
  });
  console.log(post);
  return (<JobsPostTemplate
    contentComponent={HTMLContent}
    title={post.frontmatter.position}
    description={post.html}
    company={company}
    socialMedia={company.node.frontmatter.socialMedia}
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
        companyRelated
        date
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: {frontmatter: {templateKey:{eq:"company-post"}}}) {
      edges {
        node {
          frontmatter {
            path
            templateKey
            date(formatString: "MMM DD")
            title
            logo
            location
            thumbnail
            description
            socialMedia {
              media
              url
            }
          }
        }
      }
    }
  }
`;
