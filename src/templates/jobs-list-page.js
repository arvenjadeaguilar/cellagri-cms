import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import find from 'lodash/find';

export const JobsPageTemplate = ({ title, jobs, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section company">
      <Navbar color="#2B3D54"/>
        <div className="section">
          <div className="header">
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h1>
          </div>
        </div>
        <div className="section main-job-list">
          <div className="job-containers">
            <div className="jobs">
              <h2>Cellular Agriculture Jobs</h2> 

              <div className="job-list">
                {jobs ? jobs.map(job => (
                  <div className="item">
                    <img className="item-logo" src={job.thumbnail} alt={"logo"}/>
                    <a href={job.path}><h3 className="title">{job.position && job.position.toUpperCase()}</h3></a>
                    <div className="inline">
                      <h3>{job.companyName}</h3>
                      <span className="location">{job.location}</span>
                    </div>
                    <div className="item-date">
                      {job.date}
                    </div>
                  </div>
                )):null}
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
  const { allMarkdownRemark: list } = data;

  
  let filteredCompanyList = list && list.edges.filter((item)=>{
    if(item.node.frontmatter.templateKey == 'company-post'){
        return true;
    }else{
        return false;
    }

  });
  
  let filteredJobsList = list && list.edges.filter((item)=>{
    if(item.node.frontmatter.templateKey == 'jobs-post'){
        return true;
    }else{
        return false;
    }

  }).map(item =>{
    let company = find(filteredCompanyList, function(o) {
      return o.node.frontmatter.path == item.node.frontmatter.companyRelated; 
    });
    let splitObject = {};
    
    if(company){
      splitObject = {
        thumbnail:company.node.frontmatter.thumbnail,
        companyName:company.node.frontmatter.title,
      };
    }

    return {...item.node.frontmatter, ...splitObject}
  });

  console.log(filteredJobsList);
  
  return (<JobsPageTemplate
    contentComponent={HTMLContent}
    title={post.frontmatter.title}
    content={post.html}
    jobs={filteredJobsList}
  />);
};

export const jobsPageQuery = graphql`
  query jobsPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            path
            templateKey
            date(formatString: "MMM DD")
            title
            logo
            thumbnail
            position
            location
            description
            companyRelated
          }
        }
      }
    }
  }
`;
