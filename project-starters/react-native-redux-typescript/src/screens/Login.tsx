
import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  AsyncStorage
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

type LoginProps = {
  navigation: NavigationStackProp;
};

type LoginState = {
  email: string;
  password: string;
};

export default class Login extends React.Component<LoginProps, LoginState> {
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

    // Mocked login. Use redux
    try {
      if (email.length > 0 && password.length > 0) {
        AsyncStorage.setItem('userToken', 'batman');
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
