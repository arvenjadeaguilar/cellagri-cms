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
                    <a href={company.node.frontmatter.path}><img className="item-logo" src={company.node.frontmatter.thumbnail} alt={"logo"}/></a>
                    <a href={company.node.frontmatter.path}><h3 className="title">{company.node.frontmatter.title && company.node.frontmatter.title.toUpperCase()}</h3></a>
                    <div className="info">
                      <div className="location">Berkely California</div>
                      <div className="listing">4 active cellular agriculture job listings </div>
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
  const { allMarkdownRemark: companies } = data;
  return (<CompaniesPageTemplate
    contentComponent={HTMLContent}
    title={post.frontmatter.title}
    content={post.html}
    companies={companies?companies.edges:[]}
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
          }
        }
      }
    }
  }
`;
