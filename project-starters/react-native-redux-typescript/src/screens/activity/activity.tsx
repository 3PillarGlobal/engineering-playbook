
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

type ActivityProps = {
  navigation: NavigationStackProp; // NavigationStackScreenProps<Params, ScreenProps>
};

export default function Activity(props: ActivityProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Activity Screen</Text>
      <Button title="Go Home" onPress={(): boolean => props.navigation.navigate('Home')} />
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
