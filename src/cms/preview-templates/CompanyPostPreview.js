import React from 'react';
import { CompanyPostTemplate } from '../../templates/company-post';

const CompanyPostPreview = ({ entry, getAsset }) => {
    const entryJobs = entry.getIn(['data', 'jobs']);
    const jobs = entryJobs ? entryJobs.toJS() : [];

    return (
      <CompanyPostTemplate 
        title={entry.getIn(['data', 'title'])} 
        description={entry.getIn(['data', 'description'])}
        jobs={jobs}
        logo={entry.getIn(['data', 'logo'])} 
        thumbnail={entry.getIn(['data', 'thumbnail'])} 
      />
    );
  };

export default CompanyPostPreview;
