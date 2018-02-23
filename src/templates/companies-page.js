import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const CompaniesPageTemplate = ({ title, companies,description, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section company">
      <Navbar color="#2B3D54"/>
        <div className="section">
          <div className="header">
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h1>
            <div className="socialMedia">{description}</div>
          </div>
        </div>
        <div className="section">
          <div className="job-grid-containers">
            <div className="job-grid">
                {companies ? companies.map(company => (
                  <div className="item">
                    <a href={company.path}><img className="item-logo" src={company.thumbnail} alt={"logo"}/></a>
                    <a href={company.path}><h3 className="title">{company.title && company.title.toUpperCase()}</h3></a>
                    <div className="info">
                      <div className="location">{company.location}</div>
                      <div className="listing">{company.jobsLength} active cellular agriculture job listings </div>
                    </div>
                  </div>
                )):null}
            </div> 
          </div>
      </div>
      <Footer/>
    </section>
  );
};

export default ({ data }) => {
  const { markdownRemark: post } = data;
  const { allMarkdownRemark: postList } = data;
  let companies = postList.edges.filter((post)=>{
    if(post.node.frontmatter.templateKey == 'company-post'){
      return true;
    }else{
      return false;
    }
  }).map(company=>{
    let jobs = postList.edges.filter((post)=>{
      if(post.node.frontmatter.companyRelated == company.node.frontmatter.path ){
        return true;
      }else{
        return false;
      }
    });
  
    let companyObject ={};

    if(jobs){
      companyObject = {
        jobsLength: jobs.length
      }
    }
    return {...company.node.frontmatter,...companyObject};
  });


  return (<CompaniesPageTemplate
    contentComponent={HTMLContent}
    title={post.frontmatter.title}
    content={post.html}
    companies={companies?companies:[]}
    description={post.frontmatter.description}
  />);
};

export const companiesPageQuery = graphql`
  query companiesPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        description
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
            location
            thumbnail
            description
            companyRelated
          }
        }
      }
    }
  }
`;
