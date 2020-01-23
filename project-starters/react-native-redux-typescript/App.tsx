import React from 'react';
import { Provider } from 'react-redux';

import AppContainer from './src/navigations';
import { store } from './src/store/store';

export default class App extends React.Component {
  render(): JSX.Element {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
