import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HELPERS_TEST from './helpers/helpersTest';

describe('App crash test', () => {
  beforeEach(function() {
    window.localStorage = HELPERS_TEST.storageMock();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
