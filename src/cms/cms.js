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
    },
    {
      name: 'height',
      label: 'Height',
      widget: 'string'
    },
    {
      name: 'width',
      label: 'Width',
      widget: 'string'
    }],
    pattern: /^<iframe width="(.*)" height="(.*)" src="(.*)" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen><\/iframe>/,
    
    fromBlock: function(match) {
      return {
        video_url: match[1],
      };
    },
    toBlock: function(obj) {
      return (
        '<iframe width="' + obj.width + '" height="' + obj.height + '" src="' + obj.video_url + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
      );
    },
    toPreview: function(obj) {
      return (
        '<iframe width="' + obj.width + '" height="' + obj.height + '" src="' + obj.video_url + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
      );
    },
  });