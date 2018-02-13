import React from "react";
import Link from "gatsby-link";
import Script from "react-load-script";
import graphql from "graphql";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default class IndexPage extends React.Component {
  handleScriptLoad() {
    if (typeof window !== `undefined` && window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="over-all-container">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />

        <section className="section welcome">
          <Navbar />
          
          <div className="container ">
            <div className="content">
              <h1 className="h1">Explore the future of food with us</h1>
              <p className="sub-heading">
                Your #1 source for latest news, trends and jobs in cellular agriculture.
              </p>
              <form action="https://cell.us17.list-manage.com/subscribe/post?u=1eb30a522df43dfeeb91f54d2&amp;id=96fa9a2b9c" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                <input type="email" className="input" placeholder="Your Email" name="EMAIL" id="mce-EMAIL" required />
                <button type="submit" className="btn btn-success">SUBSCRIBE</button>
              </form>
              <p>
                Get the latest research, insights and jobs delivered to your inbox every week.
              </p>
            </div>
          </div>
        </section>
        <section className="section news">
          <div className="container ">
            <div className="content">
              <h2 className="h1">News & Insights</h2>
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
            </div>
            <div className="moreTrends">
              <a href="https://medium.com/cellagri">More trends, research and insights on our blog</a>
            </div>
          </div>
        </section>
        <section className="section aboutUs">
          <div className="container ">
            <div className="content">
              <h2 className="h1">About Us</h2>
              <p>
                <b>CellAgri</b> is a research and insights platform that provides the latest insights on a range of topics relating to cellular agriculture and how this field is emerging to provide a solution in sustainable animal products.
              </p>
              <p>
                We provide the news and analysis on the latest trends in all the main companies and players in this field.
              </p>
              <p>
                Ultimately, we aim to promote a dialogue about this emerging field as a future alternative to the present livestock agricultural system.
              </p>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
      
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
