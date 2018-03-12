import CMS from 'netlify-cms';
import 'netlify-cms/dist/cms.css';
import './cms.css';
import AboutPagePreview from './preview-templates/AboutPagePreview';
import BlogPostPreview from './preview-templates/BlogPostPreview';
import ProductPagePreview from './preview-templates/ProductPagePreview';
import CompanyPostPreview from './preview-templates/CompanyPostPreview';

CMS.registerPreviewStyle('/styles.css');
CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('products', ProductPagePreview);
CMS.registerEditorComponent({
    id: "video",
    label: "Video",
    fields: [{
      name: 'video_url',
      label: 'Video-URL',
      widget: 'string'
    }],
    pattern: /^<video src="(.*)" controls>Sorry, your browser doesn't support embedded videos, but don't worry, you can <a href="(.*)">download it<\/a> and watch it with your favorite video player!<\/video>/,
    fromBlock: function(match) {
      return {
        video_url: match[1],
      };
    },
    toBlock: function(obj) {
      return (
        '<video src="' + obj.video_url + '" controls>Sorry, your browser doesn\'t support embedded videos, but don\'t worry, you can <a href="' + obj.video_url + '">download it</a> and watch it with your favorite video player!</video>'
      );
    },
    toPreview: function(obj) {
      return (
        '<video src="' + obj.video_url + '" controls>Sorry, your browser doesn\'t support embedded videos, but don\'t worry, you can <a href="' + obj.video_url + '">download it</a> and watch it with your favorite video player!</video>'
      );
    },
  });