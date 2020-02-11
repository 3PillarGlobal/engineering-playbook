import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/login/login';
import Register from '../screens/register/register';

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
