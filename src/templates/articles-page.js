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
    
    return (
      <section className="section company">
      <Navbar color="#2B3D54"/>
      <div className="">
        <div className="section">
          <div className="header container">
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">Articles</h1>
          </div>
          <div className="container-center feature_list">
            <a href="https://medium.com/cellagri/january-2018-the-month-in-review-40df065cc1a2" className="feature">
              <div className="feature_image_container">
                <img src={require('../img/blog-image-clean-meat.jpeg')} />
              </div>
              <h3 className="feature_headLine">
                January 2018: The Month in Review
              </h3>
            </a>
            <a href="https://medium.com/cellagri/cellular-agriculture-the-obstacles-ahead-83ecd77115ac" className="feature">
              <div className="feature_image_container">
                <img src={require('../img/blog-image.jpeg')} />
              </div>
              <h3 className="feature_headLine">
                Cellular Agriculture: The Obstacles Ahead
              </h3>
            </a>
            <a href="https://medium.com/cellagri/lab-grown-clothing-dd1eef9eafa" className="feature">
              <div className="feature_image_container">
                <img src={require('../img/blog-image-lab-grown.jpeg')} />
              </div>
              <h3 className="feature_headLine">
                Lab Grown Clothing
              </h3>
            </a>
            <a href="https://medium.com/cellagri/january-2018-the-month-in-review-40df065cc1a2" className="feature">
              <div className="feature_image_container">
                <img src={require('../img/blog-image-clean-meat.jpeg')} />
              </div>
              <h3 className="feature_headLine">
                January 2018: The Month in Review
              </h3>
            </a>
            <a href="https://medium.com/cellagri/january-2018-the-month-in-review-40df065cc1a2" className="feature">
              <div className="feature_image_container">
                <img src={require('../img/blog-image-clean-meat.jpeg')} />
              </div>
              <h3 className="feature_headLine">
                January 2018: The Month in Review
              </h3>
            </a>
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
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMM DD")
            path
            logo
            position
            thumbnail
            companyRelated
          }
        }
      }
    }
  }
`;
