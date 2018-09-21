import * as React from 'react';
import 'style/global.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from 'components/login/Login';
import { ROUTES_CONFIG } from 'constants/RoutesConfig';
import GraphQL from './samples/GraphQL';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const graphQLClient = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache()
});

export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {
    render() {
        return (
            <ApolloProvider client={graphQLClient}>
                <Router>
                    <Switch>
                            <Route exact path={ROUTES_CONFIG.LOGIN} component={ Login }></Route>
                            <Route exact path={ROUTES_CONFIG.GRAPHQL} component={ GraphQL }></Route>
                        {/* <Route exact path='' component={Unathorized} /> */}
                        {/* <Route component={NotFound}/> */}
                    </Switch>
                </Router>
            </ApolloProvider>
        );
    }
}
