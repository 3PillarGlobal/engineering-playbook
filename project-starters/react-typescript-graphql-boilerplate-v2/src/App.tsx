import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, HashRouter, Switch } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import './App.css';

import store from './redux/store';

import Hello from './containers/Hello';
import DocumentsPage from './pages/DocumentsPage';
import Header from './components/Header';
import NotFoundPage from './pages/NotFoundPage';
import EditDocumentPage from './pages/EditDocumentPage';
import CreateDocumentPage from './pages/CreateDocumentPage';

import withRoot from './withRoot';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit * 20
    }
  });

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});

class App extends React.Component<WithStyles<typeof styles>, {}> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <HashRouter>
            <div className="App">
              <Route component={Header} />
              <Switch>
                <Route exact={true} path="/" component={Hello} />
                <Route
                  exact={true}
                  path="/documents"
                  component={DocumentsPage}
                />
                <Route
                  exact={true}
                  path="/editDocument/:documentId"
                  component={EditDocumentPage}
                />
                <Route
                  exact={true}
                  path="/createDocument"
                  component={CreateDocumentPage}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </HashRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default withRoot(withStyles(styles)(App));
