import React from 'react';
import { CompanyPageTemplate } from '../../templates/company-post';

const CompanyPagePreview = ({ entry, getAsset }) => {
    const entryJobs = entry.getIn(['data', 'jobs']);
    const jobs = entryJobs ? entryJobs.toJS() : [];

    return (
      <CompanyPageTemplate 
        title={entry.getIn(['data', 'title'])} 
        description={entry.getIn(['data', 'description'])}
        jobs={jobs}
        logo={entry.getIn(['data', 'logo'])} 
      />
    );
  };

export default CompanyPagePreview;
