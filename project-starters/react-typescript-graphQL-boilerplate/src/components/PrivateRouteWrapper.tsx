import * as React from 'react';
import { APP_CONFIG } from '@constants/AppConfig';
import { ROUTES_CONFIG } from '@constants/RoutesConfig';
import { Route, RouteProps, Redirect } from 'react-router-dom';

export class PrivateRouteWrapper extends React.Component<any & RouteProps, undefined>  {
    token: string;

    constructor(props: RouteProps) {
        super(props);

        this.token = localStorage.getItem(APP_CONFIG.TOKEN) || null;
    }

    componentDidMount() {
        localStorage.setItem(
            'lastRoute',
            this.props.location.pathname + this.props.location.search
        );
    }

    render() {
        const { component: Component, ...rest} = this.props;

        return (
            <Route
                {...rest}
                render = { props =>
                    this.token
                    ? <Component {...props} />
                    : <Redirect
                        to={{
                            pathname: ROUTES_CONFIG.LOGIN,
                            state: {from: this.props.location}
                        }}
                    />
                }
             />
        );
    }
}