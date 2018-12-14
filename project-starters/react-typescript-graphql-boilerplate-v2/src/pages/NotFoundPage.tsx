import * as React from 'react';
import { withRouter } from 'react-router';

import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <div>Page not found</div> <Link to="/">Home</Link>
    </div>
  );
};

export default withRouter(NotFoundPage);
