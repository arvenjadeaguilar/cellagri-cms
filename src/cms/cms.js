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
        '<iframe width="' + obj.width + '" height="' + obj.height + '" src="' + obj.video_url + '" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>'
      );
    },
    toPreview: function(obj) {
      return (
        '<iframe width="' + obj.width + '" height="' + obj.height + '" src="' + obj.video_url + '" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>'
      );
    },
  });
  CMS.registerEditorComponent({
    id: "image",
    label: "Image",
    fields: [{
      name: 'image',
      label: 'Image',
      widget: 'image'
    },
    {
      label: 'Type', 
      name: 'size', 
      widget: 'select', 
      options: [{ label: "Small", value: "250px" }, { label: "Medium", value: "500px" }, { label: "Large", value: "720px" }, { label: "Full Width", value: "100%" }]
    }],
    pattern: /^<img src="(.*)" width="48"\/>/,
    
    fromBlock: function(match) {
      return {
        video_url: match[1],
      };
    },
    toBlock: function(obj) {
      return (
        '<img src="'+ obj.image +'" width="'+ obj.size +'"/>'
      );
    },
    toPreview: function(obj) {
      return (
        '<img src="'+ obj.image +'" width="'+ obj.size +'"/>'
      );
    },
  });