
import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';

import * as actions from '../store/actions';

type LoginProps = {
  navigation: NavigationStackProp;
  login: (email: string, password: string) => void;
};

type LoginState = {
  email: string;
  password: string;
};

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }


  handleEmailChange = (email: string): void => {
    this.setState({ email });
  };

  handlePasswordChange = (password: string): void => {
    this.setState({ password });
  };

  onLogin = async (): Promise<void> => {
    const { email, password } = this.state;

    try {
      if (email.length > 0 && password.length > 0) {
        this.props.login(email, password);
        this.props.navigation.navigate('App');
      }
    } catch (error) {
      //
    }
  };

  goToSignup = (): boolean => this.props.navigation.navigate('Register');

  render(): JSX.Element {
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ margin: 10 }}>
          <TextInput
            value={email}
            placeholder="Enter email"
            autoCapitalize="none"
            onChangeText={this.handleEmailChange}
          />
        </View>
        <View style={{ margin: 10 }}>
          <TextInput
            value={password}
            placeholder="Enter password"
            secureTextEntry
            onChangeText={this.handlePasswordChange}
          />
        </View>
        <Button title="Login" onPress={this.onLogin} />
        <Button title="Go to Signup" onPress={this.goToSignup} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password): void => dispatch(actions.authentication.login(email, password)).catch((err) => {
      throw err;
    })
  };
};

export default connect(null, mapDispatchToProps)(Login);
