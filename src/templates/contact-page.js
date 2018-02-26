import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const ContactUsTemplate = ({ title, contentComponent }) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section company">
      <Navbar color="#2B3D54"/>
      <div className="container">
        <div className="section">
          <div className="header">
            <div className="header-label">DROP US A LINE</div>
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">Contact</h1>
            <form name="contact" netlify>
            <p>
              <label>Your Name: <input type="text" name="name"/></label>   
            </p>
            <p>
              <label>Your Email: <input type="email" name="email"/></label>
            </p>
            <p>
              <label>Message: <textarea name="message"></textarea></label>
            </p>
            <p>
              <button type="submit">Send</button>
            </p>
          </form>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default class ContactUs extends React.Component {
  constructor(){
    super();
  }
  render() {
    let {data} = this.props;
    const { markdownRemark: post} = data;

    return (<ContactUsTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.position}
    />);
  }
};


export const contactUsPostQuery = graphql`
  query ContactUsPost($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
