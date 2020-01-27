import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthenticationNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login'
  }
);

export default AuthenticationNavigation;
