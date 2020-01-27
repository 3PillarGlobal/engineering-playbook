
import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import Header from '../components/Header';
import Album from '../components/Album';
import PROCESS_ENV from '../../env.config';

export default function Home(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Album />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  }
});
