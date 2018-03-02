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
import clone from 'lodash/clone';
import Modal from 'react-modal';
import { navigateTo } from "gatsby-link";
import Dropzone from 'react-dropzone';
import {Dropbox} from 'dropbox';
import Moment from 'moment';
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

function encode(data) {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
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

export const JobsPostTemplate = ({accepted,rejected, title,handleSubmit,handleChange,showSuccess, logo,company,modalOpen,closeModal,openModal, jobs, website,thumbnail, content, description, socialMedia,handleFileChange, contentComponent }) => {
  const PostContent = contentComponent || Content;

  let mediaJSX = socialMedia && socialMedia.map(media=>{
    return (
      <a href={media.url} key={media.url} className="media inline">
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
      {
        !showSuccess?
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
        </section>:
        <div className="contactUs">
          <div className="section">
            <h1>Success 🎉</h1>
            <div className="sectionContent">
              Congratulations! You've successfully submitted your application to {company.node.frontmatter.title}. We have contacted the company regarding your interest, and if you are lucky, you'll hear from them very soon!
            </div>
            <div className="action">
              <button className="btn btn-success" onClick={()=>navigateTo('/jobs')}>APPLY FOR MORE JOBS</button>
            </div>
          </div>
        </div> 
      }
      
      <form name="applicants" data-netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="fullName" />
        <input type="email" name="email" />
        <input type="file" name="cv" accept="application/pdf"/>
        <input type="text" name="position" />
        <input type="text" name="company" />
        <input type="url" name="twitter" />
        <input type="url" name="linkedin" />
        <input type="url" name="facebook" />
        <input type="url" name="github" />
        <textarea name="coverletter"></textarea>
      </form>
      <Footer/>
      <Modal
        isOpen={modalOpen}
        onRequestClose={()=>{console.log('onClose')}}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Application Form"
      >
        <div className="form">
          <div className="closeIcon">
            <FaClose onClick={()=>closeModal()}/>
          </div>
          <form name="applicants" method="POST" data-netlify-honeypot="bot-field" data-netlify="true" onSubmit={handleSubmit} required="true">
            <div className="formSection">
              <div className="formHeader">
                BASIC INFO
              </div>
              <div className="formBody">
                <label>
                  YOUR FULL NAME
                </label>
                <div>
                  <input type="text" className="input" onChange={handleChange} name="fullName" required="true" />
                </div>
              </div>
              <div className="formBody">
                <label>
                  YOUR EMAIL
                </label>
                <div>
                  <input type="email" className="input" onChange={handleChange} name="email" required="true" />
                </div>
              </div>
              <div className="formBody">
                <label>
                  YOUR CV's URL
                </label>
                <div>
                  <Dropzone
                    accept="application/pdf"
                    onDrop={(accepted, rejected) => { handleFileChange( accepted, rejected ); }}
                  >
                    <p>Try dropping some files here, or click to select files to upload.</p>
                    <p>Only *.pdf images will be accepted</p>
                  </Dropzone>
                </div>
                <aside>
                  {accepted && accepted.name}
                </aside>
              </div>
              <div className="formBody">
                <label>
                  COVER LETTER
                </label>
                <div>
                  <textarea className="input" name="coverletter" onChange={handleChange} rows="10" required="true" />
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
                  <input type="url" className="input" name="twitter" onChange={handleChange}/>
                </div>
              </div>
              <div className="formBody">
                <label>
                  LINKEDIN
                </label>
                <div>
                  <input type="url" className="input" name="linkedin" onChange={handleChange}/>
                </div>
              </div>
              <div className="formBody">
                <label>
                  FACEBOOK
                </label>
                <div>
                  <input type="url" className="input" name="facebook" onChange={handleChange}/>
                </div>
              </div>
              <div className="formBody">
                <label>
                  GITHUB
                </label>
                <div>
                  <input type="url" className="input" name="github" onChange={handleChange}/>
                </div>
              </div>
            </div>
            <div className="formAction">
              <button type="submit" className="btn btn-success full" disabled={!accepted}>SEND APPLICATION</button>
              { !accepted?
                <div className="note">*Please uppload your csv</div>:null
              }
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default class JobsPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen:false,
      success:false,
      accepted: null,
      rejected: []
    };
  }

  async onFileUpload(){
    
  }
  
  handleSubmit = e => {
    let body = clone(this.state);
    delete body.modalOpen;
    delete body.success;
    delete body.accepted;
    delete body.rejected;
    
    let {data} = this.props;
    const { markdownRemark: post,allMarkdownRemark:companies } = data;
    let company = find(companies.edges,(item)=>{
      return item.node.frontmatter.path == post.frontmatter.companyRelated;
    });

    
    let accessToken = "uSYoWKriaLAAAAAAAAAABvOw2boyy87WqqQLp9xaClYJO49alFR8nIj8c1r4_snE";
    let dbx = new Dropbox({ accessToken: accessToken });
    let name = this.state.fullName+'-'+ Moment().format('DD-MM-YY-hh-mm-ss')+'.pdf';
    body.cv = name;
    
    dbx.filesUpload({path: '/' + name, contents: this.state.accepted})
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.error(error);
    });


    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ 
        "form-name": "applicants",
        "position":post.frontmatter.position,
        "company":company.node.frontmatter.title,
        ...body
      })
    })
      .then(() => this.setState({modalOpen:false,success:true}))
      .catch(error => alert(error));
    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  
  handleFileChange(accepted, rejected){
    this.setState({ accepted:accepted[0]});
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
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      handleFileChange = {this.handleFileChange.bind(this)}
      showSuccess = {this.state.success}
      accepted = {this.state.accepted}
      rejected = {this.state.rejected}
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
