import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Logo from '../../assets/header_logo';

interface HeaderProps {
  headerText: string;
}
export default class Header extends React.Component<HeaderProps> {
  render() {
    const { headerText } = this.props;

    return (
      <View style={styles.headStyle}>
        <View style={styles.logoStyle}>
          <Logo />
        </View>
        <Text style={styles.headText}> { headerText } </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headText: {
    color: '#ffffff',
    fontSize: 20,
    marginLeft: 15
  },
  headStyle: {
    backgroundColor: '#35605a',
    flexDirection: 'row',
    borderColor: '#000000',
    padding: 25,
    paddingLeft: 15
  },
  logoStyle: {
    width: 25,
    height: 25,
  }
});
