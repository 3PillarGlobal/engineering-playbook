import * as React from 'react';
import '@style/global.scss';

// Components imports
import { Login } from '@components/login/Login';
import { Home } from '@components/home/Home';
import DocumentQL from '@components/samples/DocumentQL';
import DocumentHoC from '@components/samples/DocumentHoC';
import DocumentGeneratedTypes from '@components/samples/DocumentGeneratedTypes';
import DocumentMutation from '@components/samples/DocumentMutation';

// Routing imports
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ROUTES_CONFIG } from '@constants/RoutesConfig';
import { PrivateRouteWrapper } from './PrivateRouteWrapper';

// GraphQL imports
import GraphQL from './samples/GraphQL';
// import GraphQLWithTypes from './samples/GraphQLWithTypes';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { API } from '../constants/ApiConfig';

const graphQLClient = new ApolloClient({
    uri: API.GRAPHQL_ENDPOINT,
    cache: new InMemoryCache()
});

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <ApolloProvider client={ graphQLClient }>
                <Router>
                    <Switch>
                        <Route exact path={ ROUTES_CONFIG.LOGIN } component={ Login }></Route>
                        <PrivateRouteWrapper exact path={ ROUTES_CONFIG.HOME } component={ Home }></PrivateRouteWrapper>
                        <PrivateRouteWrapper exact path={ ROUTES_CONFIG.QUERY_QL } component={ GraphQL }></PrivateRouteWrapper>
                        <PrivateRouteWrapper exact path={ ROUTES_CONFIG.QUERY_QL_2 } component={ DocumentQL } ></PrivateRouteWrapper>
                        <PrivateRouteWrapper exact path={ ROUTES_CONFIG.QUERY_QL_3 } component={ DocumentHoC } ></PrivateRouteWrapper>
                        <PrivateRouteWrapper exact path={ ROUTES_CONFIG.QUERY_QL_4 } component={ DocumentGeneratedTypes } ></PrivateRouteWrapper>
                        <PrivateRouteWrapper exact path={ ROUTES_CONFIG.MUTATION } component={ DocumentMutation } ></PrivateRouteWrapper>
                        <PrivateRouteWrapper component={ Home }></PrivateRouteWrapper>
                    </Switch>
                </Router>
            </ApolloProvider>
        );
    }
}