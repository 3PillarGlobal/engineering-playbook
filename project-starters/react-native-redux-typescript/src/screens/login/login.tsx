
import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StatusBar
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import styles from './login.style';
import Header from '../../components/header/header';
import * as actions from '../../store/actions';
import { AuthenticationActions, User } from '../../store/actions/authentication';

type LoginProps = {
  navigation: NavigationStackProp;
  login: (email: string, password: string) => Promise<User>;
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

  onLogin = async () => {
    const { email, password } = this.state;

    if (email.length > 0 && password.length > 0) {
      this.props.login(email, password)
        .then(() => {
          this.props.navigation.navigate('App');
        })
        .catch(() => {
          // eslint-disable-next-line no-alert
          alert('Invalid user');
        });
    }
  };

  goToSignup = (): boolean => this.props.navigation.navigate('Register');

  render(): JSX.Element {
    const { email, password } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: StatusBar.currentHeight }}>
          <Header headerText="Login" />
        </View>
        <View style={styles.container}>
          <View style={{ margin: 10 }}>
            <TextInput
              style={styles.input}
              value={email}
              placeholder="Enter email"
              autoCapitalize="none"
              onChangeText={this.handleEmailChange}
            />
          </View>
          <View style={{ margin: 10 }}>
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Enter password"
              secureTextEntry
              onChangeText={this.handlePasswordChange}
            />
          </View>
          <TouchableOpacity
            style={{ ...styles.button, marginTop: 25 }}
            onPress={this.onLogin}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onLogin}
          >
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AuthenticationActions>) => {
  return {
    login: async (email: string, password: string): Promise<User> => dispatch(actions.authentication.login(email, password))
  };
};

export default connect(null, mapDispatchToProps)(Login);
