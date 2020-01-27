
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PROCESS_ENV from '../../env.config';

export default function Home(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text> Home { PROCESS_ENV.ANALYTICS_KEY } { PROCESS_ENV.PROFILE } </Text>
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
