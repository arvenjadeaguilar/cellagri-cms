import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './all.scss';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Cell Agri">
      <link rel="icon" type="image" href={require("../img/favicon.ico")}/>
    </Helmet>
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
