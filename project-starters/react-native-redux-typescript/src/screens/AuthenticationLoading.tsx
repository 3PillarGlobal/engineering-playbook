import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';

import { STATE_TYPE } from '../constants/store';

interface AuthenticationLoadingProps extends AuthenticationStoreProps {
  navigation: NavigationStackProp;
}

interface AuthenticationStoreProps {
  token: string;
}

class AuthenticationLoading extends React.Component<AuthenticationLoadingProps> {
  componentDidUpdate(): void {
    const userToken = this.props.token;

    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  // Render any loading content that you like here
  render(): JSX.Element {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = (state): AuthenticationStoreProps => {
  const persistedState = state[STATE_TYPE.persisted];

  return {
    token: persistedState.authentication.token
  };
};

export default connect(mapStateToProps)(AuthenticationLoading);
