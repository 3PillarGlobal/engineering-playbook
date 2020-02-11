
import React from 'react';
import { SafeAreaView } from 'react-native';

import Header from '../../components/header/header';
import Album from '../../components/album/album';
import styles from './home.style';

export default function Home(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Header headerText="Home" />
      <Album />
    </SafeAreaView>
  );
}
