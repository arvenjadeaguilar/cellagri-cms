import React from 'react';
import graphql from 'graphql';
import Content, { HTMLContent } from '../components/Content';
import Navbar from '../components/Navbar';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaLinkedIn from 'react-icons/lib/fa/linkedin';
import FaInstagram from 'react-icons/lib/fa/instagram';
import FaGlobe from 'react-icons/lib/fa/globe';
import FaClose from 'react-icons/lib/md/close';
import Footer from '../components/Footer';
import find from 'lodash/find';
import Modal from 'react-modal';

let getIcon=(media)=>{
  if(media == 'Twitter'){
    return <FaTwitter />
  }
  if(media == 'Facebook'){
    return <FaFacebook />
  }
  if(media == 'LinkedIn'){
    return <FaLinkedIn />
  }
  if(media == 'Instagram'){
    return <FaTwitter />
  }
}


const customStyles = {
  content : {
    top                   : '0',
    left                  : '0',
    right                 : '0',
    bottom                : '0',
    marginRight           : '0',
    backgroundColor       : '#F6F6F6'
  }
};

export const JobsPostTemplate = ({ title, logo,company,modalOpen,closeModal,openModal, jobs, website,thumbnail, content, description, socialMedia, contentComponent }) => {
  const PostContent = contentComponent || Content;

  let mediaJSX = socialMedia && socialMedia.map(media=>{
    return (
      <a href={media.url} className="media inline">
        {getIcon(media.media)} {media.media}
      </a>
    );
  });
  return (
    <section className="section company">
      <Navbar color="#2B3D54"/>
      <div className="container">
        <div className="section">
          <div className="header">
            <div className="header-label">JOB LISTING</div>
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h1>
            <div className="header-company">
              <div className="thumbnail">
                <img src={company.node.frontmatter.thumbnail} alt="logo"/>
              </div>
              <div className="title">
                {company.node.frontmatter.title}
              </div>
              <div className="companymedia">
                <a href={website} className="media inline">
                  <FaGlobe /> Website
                </a>
                {mediaJSX}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="container-fluid">
        <div className="jobDescription">
          <div className="jobPanelDesc">
            <PostContent content={description} />
            <div className="jobDescriptionsFooter">
              <div>Sounds interesting?</div>
              <button className="btn btn-success" onClick={()=>openModal()}>APPLY FOR THIS JOB</button>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
      <Modal
        isOpen={modalOpen}
        onRequestClose={()=>{console.log('onClose')}}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="form">
          <div className="closeIcon">
            <FaClose onClick={()=>closeModal()}/>
          </div>
          <form name="applicant" netlify>
            <div className="formSection">
              <div className="formHeader">
                BASIC INFO
              </div>
              <div className="formBody">
                <label>
                  YOUR FULL NAME
                </label>
                <div>
                  <input type="text" className="input" name="fullName" />
                </div>
              </div>
              <div className="formBody">
                <label>
                  YOUR EMAIL
                </label>
                <div>
                  <input type="email" className="input" name="email" />
                </div>
              </div>
              <div className="formBody">
                <label>
                  ATTACH YOUR CV
                </label>
                <div>
                  <input type="file" className="input" name="cv" />
                </div>
              </div>
              <div className="formBody">
                <label>
                  COVER LETTER
                </label>
                <div>
                  <textarea type="text" className="input" name="coverletter" rows="10" />
                </div>
              </div>
            </div>
            <div className="formSection">
              <div className="formHeader">
                LINKS
              </div>
              
              <div className="formBody">
                <label>
                  TWITTER
                </label>
                <div>
                  <input type="text" className="input" name="twitter" />
                </div>
              </div>
              <div className="formBody">
                <label>
                  LINKEDIN
                </label>
                <div>
                  <input type="text" className="input" name="linkedin" />
                </div>
              </div>
              <div className="formBody">
                <label>
                  FACEBOOK
                </label>
                <div>
                  <input type="text" className="input" name="facebook" />
                </div>
              </div>
              <div className="formBody">
                <label>
                  GITHUB
                </label>
                <div>
                  <input type="text" className="input" name="github" />
                </div>
              </div>
            </div>
            <div className="formAction">
              <button type="submit" className="btn btn-success full">SEND APPLICATION</button>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default class JobsPost extends React.Component {
  constructor(){
    super();
    this.state = {
      modalOpen:false
    };
    
  }
  openModal(){
    this.setState({modalOpen:true});
  }
  closeModal(){
    this.setState({modalOpen:false});
  }
  render() {
    let {data} = this.props;
    const { markdownRemark: post,allMarkdownRemark:companies } = data;
    let company = find(companies.edges,(item)=>{
      return item.node.frontmatter.path == post.frontmatter.companyRelated;
    });

    return (<JobsPostTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.position}
      description={post.html}
      company={company}
      modalOpen={this.state.modalOpen}
      openModal={this.openModal.bind(this)}
      closeModal={this.closeModal.bind(this)}
      socialMedia={company.node.frontmatter.socialMedia}
    />);
  }
};


// export default ({ data }) => {
//   const { markdownRemark: post,allMarkdownRemark:companies } = data;
//   let company = find(companies.edges,(item)=>{
//     return item.node.frontmatter.path == post.frontmatter.companyRelated;
//   });
  

//   return (<JobsPostTemplate
//     contentComponent={HTMLContent}
//     title={post.frontmatter.position}
//     description={post.html}
//     company={company}
//     socialMedia={company.node.frontmatter.socialMedia}
//   />);
// };

export const jobsPostQuery = graphql`
  query JobsPost($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        position
        location
        description
        companyRelated
        date
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: {frontmatter: {templateKey:{eq:"company-post"}}}) {
      edges {
        node {
          frontmatter {
            path
            templateKey
            date(formatString: "MMM DD")
            title
            logo
            location
            thumbnail
            description
            socialMedia {
              media
              url
            }
          }
        }
      }
    }
  }
`;
