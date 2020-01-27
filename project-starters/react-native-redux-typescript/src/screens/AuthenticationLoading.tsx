import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';


import { STATE_TYPE } from '../constants/store';

type AuthenticationLoadingProps = {
  navigation: NavigationStackProp;
  token: string;
};

class AuthenticationLoading extends React.Component<AuthenticationLoadingProps> {
  componentDidMount(): void {
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async (): Promise<void> => {
    const userToken = this.props.token;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

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

const mapStateToProps = state => {
  let persistedState = state[STATE_TYPE.persisted];

  return {
    token: persistedState.authentication.token
  };
};

export default connect(mapStateToProps)(AuthenticationLoading);