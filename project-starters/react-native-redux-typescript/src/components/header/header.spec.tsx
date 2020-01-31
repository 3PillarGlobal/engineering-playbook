import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Header from './header';

jest.mock('react-navigation', () => { return { withNavigation: (component) => component }; });

const mockStore = configureStore([]);
const mockProps = {
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
        <Header navigation={mockProps.navigation} headerText="Header" />
      </Provider>
    );
  });

  it('should using Snapshots', () => {
    expect(headerComponent).toMatchSnapshot();
  });
});
