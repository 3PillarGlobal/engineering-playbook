import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigation from './AuthenticationNavigation';
import AppNavigation from './AppNavigation';
import AuthenticationLoading from '../screens/authLoading/AuthenticationLoading';

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
