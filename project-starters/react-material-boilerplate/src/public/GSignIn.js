import React from 'react';
import { withRouter } from 'react-router';
import PublicPageTpl from './components/PublicPageTpl';

class GSignIn extends React.Component {
  constructor(props) {
    super(props);

    this._onGSignIn = this._onGSignIn.bind(this);
  }

  render() {
    return (
      <PublicPageTpl
        title="Google Sign In"
        subtitle="Sign in to AppStarter using your Google account."
        gSignIn={true}
        onGSignIn={this._onGSignIn}
      />
    );
  }

  _onGSignIn(googleUser) {
    console.log('_onGSignIn');
    let profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
}

export default withRouter(GSignIn);
