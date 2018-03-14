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
    pattern: /^<iframe width="420" height="345" src="(.*)"><\/iframe>/,
    
    fromBlock: function(match) {
      return {
        video_url: match[1],
      };
    },
    toBlock: function(obj) {
      return (
        '<iframe width="420" height="345" src="' + obj.video_url + '"></iframe>'
      );
    },
    toPreview: function(obj) {
      return (
        '<iframe width="420" height="345" src="' + obj.video_url + '"></iframe>'
      );
    },
  });