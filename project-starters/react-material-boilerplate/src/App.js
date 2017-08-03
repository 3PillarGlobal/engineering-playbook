import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PrivateRoute from './helpers/PrivateRoute';
import Login from './public/Login';
import Unauthorized from './public/Unauthorized';
import NotFound from './public/NotFound';
import URL_REPO from './constants/UrlRepo';
import Home from './private/Home/Home';
import GSignIn from './public/GSignIn';
import { createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { indigo, orange, red } from 'material-ui/colors';
import './App.css';

const theme = createMuiTheme({
  palette: createPalette({
    primary: orange,
    accent: {
      ...indigo,
      A400: '#2759a0'
    },
    error: red
  })
});

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <main className="u-fx u-fx-column">
            <Switch>
              <PrivateRoute exact path={URL_REPO.ROOT_URL} component={Home} />
              <Route exact path={URL_REPO.LOGIN} component={Login} />
              <Route exact path={URL_REPO.GSIGNIN} component={GSignIn} />
              <Route
                exact
                path={URL_REPO.UNAUTHORIZED}
                component={Unauthorized}
              />
              <Route component={NotFound} />
            </Switch>
          </main>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
