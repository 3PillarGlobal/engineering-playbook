
import React from 'react';
import {
  View,
  Button
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import Header from '../../components/header/header';
import styles from './settings.style';

type SettingsProps = {
  navigation: NavigationStackProp; // NavigationStackScreenProps<Params, ScreenProps>
};

export default function Settings(props: SettingsProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Header headerText="Settings" />
      <Button title="Go Home" onPress={(): boolean => props.navigation.navigate('Home')} />
    </View>
  );
}
