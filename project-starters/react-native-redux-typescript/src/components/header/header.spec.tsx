import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Header from './header';

jest.mock('react-navigation', () => {
  return {
    withNavigation: (Component) => (props) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Component navigation={mockProps.navigation} {...props} />
    )
  };
});

const mockStore = configureStore([]);
const mockProps = {
  headerText: 'Header',
  navigation: {
    navigate: jest.fn(),
    state: {
      routeName: 'Login'
    }
  }
};

describe('Header component ', () => {
  let store;
  let headerComponent;

  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });

    headerComponent = renderer.create(
      <Provider store={store}>
        <Header headerText={mockProps.headerText} />
      </Provider>
    );
  });

  it('should using Snapshots', () => {
    expect(headerComponent).toMatchSnapshot();
  });
});
