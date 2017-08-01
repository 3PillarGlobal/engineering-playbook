import React from 'react';
import URL_REPO from '../constants/UrlRepo';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem('x-auth-token')
      ? localStorage.getItem('x-auth-token')
      : null;
  }

  componentDidMount() {
    localStorage.setItem(
      'lastRoute',
      this.props.location.pathname + this.props.location.search
    );
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          this.token
            ? <Component {...props} />
            : <Redirect
                to={{
                  pathname: URL_REPO.UNAUTHORIZED,
                  state: { from: props.location }
                }}
              />}
      />
    );
  }
}
export default PrivateRoute;
