import React from "react";
import Link from "gatsby-link";
import Script from "react-load-script";
import graphql from "graphql";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import flatten from 'lodash/flatten'
import slice from 'lodash/slice'
import find from 'lodash/find'
import orderBy from 'lodash/orderBy'
export default class ArticlesPage extends React.Component {
  
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    console.log(posts);

    let articlesJSX = posts && posts.map(article => {
      return (
        <Link key={article.node.id} to={article.node.frontmatter.path} className="feature">
          <div className="feature_image_container">
            <img src={article.node.frontmatter.image} />
          </div>
          <div className="feature_date">
            {article.node.frontmatter.date}
          </div>
          <h3 className="feature_headLine">

            {article.node.frontmatter.title}
          </h3>
        </Link>
      );
    });
    return (
      <section className="section company">
      <Navbar color="#2B3D54"/>
      <div className="">
        <div className="section">
          <div className="header container">
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">Articles</h1>
          </div>
          <div className="container-center feature_list">
            {articlesJSX}
          </div>
        </div>
      </div>
      <Footer/>
    </section>
    );
  }
}

export const pageQuery = graphql`
  query ArticlesQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] },filter:{frontmatter:{templateKey:{eq:"blog-post"}}}) {
      edges {
        node {
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMM DD, YYYY")
            path
            image
          }
        }
      }
    }
  }
`;
