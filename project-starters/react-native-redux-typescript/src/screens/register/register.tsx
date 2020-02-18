
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

type RegisterProps = {
  navigation: NavigationStackProp; // NavigationStackScreenProps<Params, ScreenProps>
};

export default function Register(props: RegisterProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Button title="Go to Login" onPress={(): boolean => props.navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
