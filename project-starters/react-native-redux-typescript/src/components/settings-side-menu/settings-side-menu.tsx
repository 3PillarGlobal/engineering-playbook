import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import { DrawerContentComponentProps } from 'react-navigation-drawer';

import { AuthenticationActions } from '../../store/actions/authentication';
import * as actions from '../../store/actions';
import styles from './settings-side-menu.style';

interface DispatchedActions {
  logout: () => void;
}

class SettingsSideMenu extends React.Component<DrawerContentComponentProps & DispatchedActions, {}> {
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
              Settings
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Admin')}>
                Admin
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Settings')}>
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
