import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './all.scss';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Cell Agri" />
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
