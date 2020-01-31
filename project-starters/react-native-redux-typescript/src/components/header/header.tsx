import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { withNavigation } from 'react-navigation';

import styles from './header.style';
import Logo from '../../../assets/header_logo';
import * as actions from '../../store/actions';

interface HeaderActions {
  logout: () => void;
}

interface HeaderProps {
  navigation: NavigationStackProp;
  headerText: string;
}
class Header extends React.Component<HeaderProps & HeaderActions, {}> {
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
        {this.props.navigation.state.routeName !== 'Login' && (
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


const mapDispatchToProps = (dispatch) => {
  return {
    logout: (): void => dispatch(actions.authentication.logout())
  };
};

export default connect(null, mapDispatchToProps)(withNavigation(Header)) as React.ComponentType;
