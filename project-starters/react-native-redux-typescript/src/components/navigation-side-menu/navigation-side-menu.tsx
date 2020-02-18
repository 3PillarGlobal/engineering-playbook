import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { DrawerContentComponentProps } from 'react-navigation-drawer';

import styles from './navigation-side-menu.style';

export default class NavigationSideMenu extends React.Component<DrawerContentComponentProps, {}> {
  navigateToScreen = (route: string) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Main App
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
                Home
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Leads')}>
                Leads
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Tasks')}>
                Tasks
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Activity')}>
                Activity
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Resources')}>
                Resources
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
