import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import { DrawerContentComponentProps, NavigationDrawerProp } from 'react-navigation-drawer';

import { AuthenticationActions } from '../../store/actions/authentication';
import * as actions from '../../store/actions';
import styles from './settings-side-menu.style';

interface DispatchedActions {
  logout: () => void;
}
interface SettingsSideMenuState {
  currentRouteName: string;
}

interface NavigationProps {
  navigation: NavigationDrawerProp;
}

class SettingsSideMenu extends React.Component<DrawerContentComponentProps & DispatchedActions & NavigationProps, SettingsSideMenuState> {
  static getDerivedStateFromProps(props: DrawerContentComponentProps & DispatchedActions & NavigationProps) {
    return {
      currentRouteName: props.navigation.state.routeName
    };
  }

  constructor(props: DrawerContentComponentProps & DispatchedActions & NavigationProps) {
    super(props);

    this.state = {
      currentRouteName: props.navigation.state.routeName
    };
  }

  navigateToScreen = (route: string) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  private onLogout = (): void => {
    this.props.logout();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Settings Menu
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Admin')}>
                Admin
              </Text>
              <Text
                style={{ ...styles.navItemStyle, backgroundColor: this.state.currentRouteName === 'Settings' ? '#35605a' : 'white' }}
                onPress={this.navigateToScreen('Settings')}
              >
                Settings
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Help')}>
                Help
              </Text>
              <Text style={styles.navItemStyle} onPress={this.onLogout}>
                Logout
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
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

export default connect<{}, DispatchedActions, void>(null, mapDispatchToProps)(SettingsSideMenu) as React.ComponentType<DrawerContentComponentProps>;
