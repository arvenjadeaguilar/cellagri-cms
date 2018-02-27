import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function encode(data) {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

export const ContactUsTemplate = ({ title,handleSubmit,handleChange, contentComponent }) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section company">
      <Navbar color="#2B3D54"/>
      <div className="container">
        <div className="section">
          <div className="header">
            <div className="header-label">DROP US A LINE</div>
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">Contact</h1>
              <div className="form">
                <form
                  name="contactUs"
                  method="post"
                  action="/thanks/"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}>
                  
                  <p hidden>
                    <label>
                      Don’t fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  <p>
                    <label>Your Name: <input type="text" name="name"  onChange={handleChange}/></label>   
                  </p>
                  <p>
                    <label>Your Email: <input type="email" name="email"  onChange={handleChange}/></label>
                  </p>
                  <div netlify-recaptcha></div>
                  <p>
                    <label>Message: <textarea name="message" onChange={handleChange}></textarea></label>
                  </p>
                  <p>
                    <button type="submit">Send</button>
                  </p>
                </form>
              </div>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default class ContactUs extends React.Component {
  constructor(props){
    super(props);
    this.state = {};

  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = e => {
    console.log(this.state);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contactUs", ...this.state })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  };

  render() {
    let {data} = this.props;
    const { markdownRemark: post} = data;

    return (<ContactUsTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.position}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
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
