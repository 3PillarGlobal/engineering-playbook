
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StatusBar
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';

import Header from '../components/Header';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cadetblue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    backgroundColor: 'white',
    width: 250,
    padding: 12
  },
  button: {
    alignItems: 'center',
    width: 150,
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#A1785F',
    color: 'white'
  },
  text: {
    color: 'white'
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