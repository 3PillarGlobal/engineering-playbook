
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

type ResourcesProps = {
  navigation: NavigationStackProp; // NavigationStackScreenProps<Params, ScreenProps>
};

export default function Resources(props: ResourcesProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Resources Screen</Text>
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
