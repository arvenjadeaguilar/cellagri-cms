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

export const ContactUsTemplate = ({ title,handleSubmit,handleChange,name,email,message, contentComponent }) => {
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
          {/* <div className="contactUs">
            <div className="form">
                <div className="formSection">
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
                    <div className="formBody">
                      <label>
                        YOUR FULL NAME
                      </label>
                      <div>
                        <input type="text" className="input" name="name"  onChange={handleChange} />
                      </div>
                    </div>
                    <div className="formBody">
                      <label>
                        YOUR EMAIL
                      </label>
                      <div>
                        <input type="email" className="input" name="email"  onChange={handleChange} />
                      </div>
                    </div>
                    <div className="formBody">
                      <label>
                        MESSAGE
                      </label>
                      <div>
                        <textarea type="text" className="input" name="message" onChange={handleChange} rows="10" />
                      </div>
                    </div>
                    
                    <div className="formAction">
                      <button type="submit" className="btn btn-success full">SEND APPLICATION</button>
                    </div>
                  </form>
                </div>
              </div>
          </div> */}
          <form name="test" method="POST" data-netlify-honeypot="bot-field" data-netlify="true" onSubmit={handleSubmit}>
            <p>
              <label>Your Name: <input type="text" name="name"/></label>   
            </p>
            <p>
              <label>Your Email: <input type="email" name="email"/></label>
            </p>
            <p>
              <label>Message: <textarea name="message"></textarea></label>
            </p>
            <div data-netlify-recaptcha="true"></div>
            <p>
              <button type="submit">Send</button>
            </p>
          </form>
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", message: "" };
  }
  
  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "test", ...this.state })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));
    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });


  render() {
    const { name, email, message } = this.state;
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
