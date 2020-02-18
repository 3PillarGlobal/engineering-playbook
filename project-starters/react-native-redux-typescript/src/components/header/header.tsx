/* eslint-disable react/state-in-constructor */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { NavigationDrawerProp } from 'react-navigation-drawer';
import { Dispatch } from 'redux';
import Octicons from 'react-native-vector-icons/Octicons';

import styles from './header.style';
import Logo from '../../../assets/header_logo';
import * as actions from '../../store/actions';
import { AuthenticationActions } from '../../store/actions/authentication';

interface DispatchedActions {
  logout: () => void;
}
interface NavigationProps {
  navigation: NavigationDrawerProp;
}
interface HeaderProps {
  headerText: string;
}
interface HeaderState {
  isAuthRoute: boolean;
}

class Header extends React.Component<HeaderProps & NavigationProps & DispatchedActions, HeaderState> {
  constructor(props: HeaderProps & NavigationProps & DispatchedActions) {
    super(props);

    this.state = {
      isAuthRoute: props.navigation.state.routeName === 'Login'
    };
  }

  static getDerivedStateFromProps(props: HeaderProps & NavigationProps & DispatchedActions) {
    return {
      isAuthRoute: props.navigation.state.routeName === 'Login'
    };
  }


  private onLogout = (): void => {
    this.props.logout();
    this.props.navigation.navigate('Auth');
  };

  private openMenuDrawer = () => {
    // This is shit :(
    // TODO find something else
    (this.props.navigation.dangerouslyGetParent().dangerouslyGetParent() as NavigationDrawerProp).openDrawer();
  };

  private openSettingsDrawer = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    const { headerText } = this.props;

    return (
      <View style={styles.headStyle}>
        <View style={{ paddingRight: 16 }}>
          {!this.state.isAuthRoute && <Octicons name="three-bars" size={30} color="white" onPress={this.openMenuDrawer} />}
        </View>
        <View style={styles.logoStyle}>
          <Logo />
        </View>
        <View style={{ paddingTop: 0, flexDirection: 'row' }}>
          <Text style={styles.headText}> {headerText} </Text>
        </View>
        <View style={{
          paddingTop: 0, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 'auto'
        }}
        >
          {!this.state.isAuthRoute && (
            <TouchableOpacity
              style={{ marginLeft: 'auto' }}
              onPress={this.onLogout}
            >
              <Text style={{ ...styles.text, paddingTop: 6, paddingRight: 16 }}>Logout</Text>
            </TouchableOpacity>
          )}
          {!this.state.isAuthRoute && <Octicons name="three-bars" size={30} color="white" onPress={this.openSettingsDrawer} />}
        </View>
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch: Dispatch<AuthenticationActions>): DispatchedActions => {
  return {
    logout: () => dispatch(actions.authentication.logout())
  };
};

export default connect<{}, DispatchedActions, void>(null, mapDispatchToProps)(
  withNavigation(Header)
) as React.ComponentType<HeaderProps>;
