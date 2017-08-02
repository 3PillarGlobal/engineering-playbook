import React from 'react';
import { withRouter } from 'react-router';
import IconButton from 'material-ui/IconButton';
import LogoutIcon from 'material-ui-icons/ExitToApp';
import URL_REPO from '../../constants/UrlRepo';
import REQ_HELPER from '../../helpers/requests';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this._handleLogout = this._handleLogout.bind(this);
  }
  render() {
    return (
      <IconButton aria-label="Logout" onClick={this._handleLogout}>
        <LogoutIcon />
      </IconButton>
    );
  }

  _handleLogout() {
    REQ_HELPER.postWithToken(URL_REPO.BE_LOGOUT)
      .send({})
      .end(function(err, res) {
        if (err) {
          console.log('#TODO Treat errors');
        } else {
          localStorage.clear();
          window.location = URL_REPO.LOGIN;
        }
      });
  }
}

export default withRouter(UserInfo);
