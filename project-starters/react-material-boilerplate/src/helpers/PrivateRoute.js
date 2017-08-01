import React from 'react';
import URL_REPO from '../constants/UrlRepo';
import APP_CONFIG from '../constants/AppConfig';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem(APP_CONFIG.TOKEN)
      ? localStorage.getItem(APP_CONFIG.TOKEN)
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
