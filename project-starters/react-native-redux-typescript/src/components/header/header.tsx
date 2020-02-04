import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { withNavigation } from 'react-navigation';
import { Dispatch } from 'redux';

import styles from './header.style';
import Logo from '../../../assets/header_logo';
import * as actions from '../../store/actions';
import { AuthenticationActions } from '../../store/actions/authentication';

interface DispatchedActions {
  logout: () => void;
}
interface NavigationProps {
  navigation: NavigationStackProp;
}
interface HeaderProps {
  headerText: string;
}
class Header extends React.Component<HeaderProps & NavigationProps & DispatchedActions, {}> {
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


const mapDispatchToProps = (dispatch: Dispatch<AuthenticationActions>): DispatchedActions => {
  return {
    logout: () => dispatch(actions.authentication.logout())
  };
};

export default connect<{}, DispatchedActions, void>(null, mapDispatchToProps)(
  withNavigation(Header)
) as React.ComponentType<HeaderProps>;
