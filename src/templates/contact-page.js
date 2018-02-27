import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { navigateTo } from "gatsby-link"

function encode(data) {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

export const ContactUsTemplate = ({ title,handleSubmit,showSuccess,handleChange,name,email,message, contentComponent }) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section company">
      <Navbar color="#2B3D54"/>
      <div className="">
        <div className="section">
          <div className="header container">
            <div className="header-label">DROP US A LINE</div>
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">Contact</h1>
          </div>
          <div className="contactUs">
            { !showSuccess?
            <div className="form">
              <div className="formSection">
                <form name="contactUsForm" method="POST" data-netlify-honeypot="bot-field" data-netlify="true" onSubmit={handleSubmit}>
                  <div className="formBody">
                    <label>
                      YOUR FULL NAME
                    </label>
                    <div>
                      <input type="text" className="input" name="name" onChange={handleChange} required="true" />
                    </div>
                  </div>
                  <div className="formBody">
                    <label>
                      YOUR EMAIL
                    </label>
                    <div>
                      <input type="email" className="input" name="email" onChange={handleChange} required="true"/>
                    </div>
                  </div>
                  <div className="formBody">
                    <label>
                      MESSAGE
                    </label>
                    <div>
                      <textarea type="text" className="input" name="message" onChange={handleChange} rows="10" required="true"/>
                    </div>
                  </div>
                  <div data-netlify-recaptcha="true"></div>
                  <div className="formAction">
                    <button type="submit" className="btn btn-success full">SEND APPLICATION</button>
                  </div>
                </form>
              </div>
            </div>
            :
            <div className="section">
              <h1>Success 🎉</h1>
              <div className="sectionContent">
                Thanks for getting in touch, you’ll hear back from someone on our team soon.
              </div>
            </div>}
          </div>
          
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { success:false,name: "", email: "", message: "" };
  }
  
  handleSubmit = e => {
    if(grecaptcha && grecaptcha.getResponse().length > 0)
    {
        //the recaptcha is checked
        // Do what you want here
        alert('Well, recaptcha is checked !');
    }
    let body = {
      "form-name": "contactUsForm",
      name: this.state.name, 
      email: this.state.email, 
      message: this.state.message
    }
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(body)
    })
      .then(() => this.setState({success:true}))
      .catch(error => alert(error));
    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });


  render() {
    const { name, email, message,success } = this.state;
    let {data} = this.props;
    const { markdownRemark: post} = data;

    return (<ContactUsTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.position}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      name = {name}
      email = {email}
      message = {message}
      showSuccess={success}
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
