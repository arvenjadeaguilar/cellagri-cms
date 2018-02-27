import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export const ThankYouTemplate = ({contentComponent }) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section company">
      <Navbar color="#2B3D54"/>
      <div className="">
        <div className="section">
          <div className="header container">
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">Contact</h1>
          </div>
        </div>
        <div className="contactUs">
          <div className="section">
            <h1>Success</h1>
            <div className="sectionContent">
              Thanks for getting in touch, you’ll hear back from someone on our team soon.
            </div>
          </div>
        </div>        
      </div>
      
      <Footer/>
    </section>
  );
};

export default class ThankYou extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let {data} = this.props;
    const { markdownRemark: post} = data;

    return (<ThankYouTemplate
      contentComponent={HTMLContent}
    />);
  }
};


export const contactUsPostQuery = graphql`
  query ThankYouPost($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
