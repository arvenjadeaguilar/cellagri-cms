import React from 'react';
import { CompanyPageTemplate } from '../../templates/company-post';

const CompanyPagePreview = ({ entry, widgetFor }) => (
  <CompanyPageTemplate title={entry.getIn(['data', 'title'])} />
);

export default CompanyPagePreview;
