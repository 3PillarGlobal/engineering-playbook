import React from 'react';
import {
  ActivityIndicator,
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
  componentDidMount(): void {
    const userToken = this.props.token;

    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  render(): JSX.Element {
    return (
      <View>
        <ActivityIndicator style={{ height: '100%' }} />
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
