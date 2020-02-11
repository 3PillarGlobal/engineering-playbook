import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigation from './authentication-navigation';
import AppNavigation from './app-navigation';
import AuthenticationLoading from '../screens/authLoading/authentication-loading';

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthenticationLoading,
    Auth: AuthNavigation,
    App: AppNavigation
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
