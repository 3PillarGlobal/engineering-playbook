import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { withNavigation } from 'react-navigation';

import Logo from '../../assets/header_logo';
import * as actions from '../store/actions';

interface HeaderActions {
  logout: () => void;
}

interface HeaderProps {
  navigation: NavigationStackProp;
  headerText: string;
}
class Header extends React.Component<HeaderProps & HeaderActions> {
  private onLogout = (): void => {
    this.props.logout();
    this.props.navigation.navigate('Auth');
  };

  render() {
    const { headerText } = this.props;

    return (
      <View style={styles.headStyle}>
        <View style={styles.logoStyle}>
          <Logo />
        </View>
        <Text style={styles.headText}> {headerText} </Text>
        {this.props.navigation.state.routeName !== 'Login'
          && (
          <TouchableOpacity
            style={{ marginLeft: 'auto' }}
            onPress={this.onLogout}
          >
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
          )}
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
  },
  text: {
    color: 'white',
    textAlign: 'center'
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (): void => dispatch(actions.authentication.logout())
  };
};

export default connect(null, mapDispatchToProps)(withNavigation(Header));
