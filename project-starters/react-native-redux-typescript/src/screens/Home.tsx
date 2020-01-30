
import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import Header from '../components/Header';
import Album from '../components/Album';

export default function Home(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Header headerText="Home" />
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
