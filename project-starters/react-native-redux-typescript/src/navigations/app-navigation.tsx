import { createDrawerNavigator } from 'react-navigation-drawer';

import Home from '../screens/home/home';
import Leads from '../screens/leads/leads';
import Activity from '../screens/activity/activity';
import Tasks from '../screens/tasks/tasks';
import Resources from '../screens/resources/resources';
import NavigationSideMenu from '../components/navigation-side-menu/navigation-side-menu';
import SettingsSideMenu from '../components/settings-side-menu/settings-side-menu';

const DrawerSettingNavigation = createDrawerNavigator(
  {
    Home: { screen: Home },
    Leads: { screen: Leads },
    Tasks: { screen: Tasks },
    Activity: { screen: Activity },
    Resources: { screen: Resources }
  },
  {
    contentComponent: SettingsSideMenu,
    drawerPosition: 'right'
  }
);

const appNavigation = createDrawerNavigator(
  {
    Drawer: DrawerSettingNavigation,
  },
  {
    navigationOptions: {},
    contentComponent: NavigationSideMenu,
    drawerPosition: 'left',
  }
);

export default appNavigation;
