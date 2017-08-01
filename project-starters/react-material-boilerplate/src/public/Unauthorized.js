import React from 'react';
import { withRouter } from 'react-router';
import PublicPageTpl from './components/PublicPageTpl';

const Unauthorized = () => {
  return (
    <PublicPageTpl title="Unauthorized" subtitle="You are momentarily not allowed to view this page." redirectTitle="Go To Login" />
  );
};

export default withRouter(Unauthorized);
