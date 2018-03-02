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
import { navigateTo } from "gatsby-link"

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
    let companyList = posts && posts.filter(({node})=>{
      return node.frontmatter.templateKey == 'company-post'
    }).map((job)=>{
      return job.node.frontmatter;
    });

    let blogList = posts && posts.filter(({node})=>{
      return node.frontmatter.templateKey == 'blog-post'
    }).map((blog)=>{
      return blog.node.frontmatter;
    });

    let blogJSX = blogList.map((blog)=>{
      return (
        <a key={blog.path} href={blog.path} className="feature">
          <div className="feature_image_container">
            <img src={blog.image} />
          </div>
          <h3 className="feature_headLine">
            {blog.title}
          </h3>
        </a>
      );
    });

    let jobsList = posts && posts.filter(({node})=>{
      return node.frontmatter.templateKey == 'jobs-post'
    }).map((job)=>{
      let jobObject = {};
      let company = find(companyList, function(o) { 
        return o.path == job.node.frontmatter.companyRelated; 
      });

      if(company){
        jobObject = {
          title:company.title,
          thumbnail:company.thumbnail
        }
      }
      return {...job.node.frontmatter,...jobObject};
    });
    let jobs = orderBy(slice(jobsList,0,5),['date'],['desc']);
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
            <div className="content title_container">
              <h2 className="h1">News & Insights</h2>
            </div>
            <div className="container-center feature_list">
              {blogJSX}
            </div>
            <div className="more">
              <Link to={'/articles'}>More trends, research and insights on our blog</Link>
            </div>
          </div>
        </section>
        <section className="section main-job-list">
          <div className="container ">
            <div className="content">
              {/* <h2 className="h1">Jobs</h2> */}
              <div className="section">
                <div className="job-containers">
                  <div className="jobs">
                    <h2>Latest Jobs</h2> 
                    <div className="job-list">
                      {jobs ? jobs.map(job => (
                        <div className="item">
                          <img className="item-logo" src={job.thumbnail} alt={"logo"}/>
                          <h3 className="title"><Link to={job.path}>{job.position}</Link></h3>
                          <div className="inline">
                            <h3>{job.title}</h3>
                            <span className="location">{job.location}</span>
                          </div>
                          <div className="item-date">
                            {job.date}
                          </div>
                        </div>
                      )):null}
                      <div className="more">
                        <button className="btn btn-info" onClick={()=>navigateTo('/jobs')}>See all jobs</button>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
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
            date(formatString: "MMM DD")
            path
            logo
            image
            position
            thumbnail
            companyRelated
          }
        }
      }
    }
  }
`;
