import React from 'react';
import { withRouter } from 'react-router';
import PublicPageTpl from './components/PublicPageTpl';

const NotFound = () => {
  return (
    <PublicPageTpl title="Not found." subtitle="The resource you are trying to access is not available." redirectTitle="Go To Homepage" />
  );
};

export default withRouter(NotFound);
