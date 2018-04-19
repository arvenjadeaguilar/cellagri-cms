import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { navigateTo } from "gatsby-link"
import Helmet from 'react-helmet';

export const BlogPostTemplate = ({
  content, contentComponent, description, title,
}) => {
  const PostContent = contentComponent || Content;

  return (
    // <section className="section">
      
    //   <div className="container content">
    //     <div className="columns">
    //       <div className="column is-10 is-offset-1">
    //         <h1 className="title is-size-2 has-text-weight-bold is-bold-light">{title}</h1>
    //         <p>{description}</p>
    //         <PostContent content={content} />
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="section">
      <Helmet title={title}>
      </Helmet>
      <Navbar color="#2B3D54"/>
      <div className="">
        <div className="section">
          <div className="header container">
            <div className="header-label">ARTICLE</div>
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h1>
          </div>
          <div className="container blog">
           <PostContent content={content} />
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default ({ data }) => {
  const { markdownRemark: post } = data;

  return (<BlogPostTemplate
    content={post.html}
    contentComponent={HTMLContent}
    description={post.frontmatter.description}
    title={post.frontmatter.title}
  />);
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`;
