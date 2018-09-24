import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import * as request from 'superagent';
import { APP_CONFIG } from 'constants/AppConfig';
import { API } from 'constants/ApiConfig';
import { ROUTES_CONFIG } from 'constants/RoutesConfig';

export interface LoginProps {
  history: any;
  classes: any;
}

interface LoginState {
    username: string;
    password: string;
    formErrors: { username: string, password: string };
    usernameHasError: boolean;
    passwordHasError: boolean;
}

export class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            username: '',
            password: '',
            formErrors: { username: '', password: '' },
            usernameHasError: false,
            passwordHasError: false
        };
    }

    componentDidMount() {
        if (localStorage.getItem(APP_CONFIG.TOKEN)) {
          this.props.history.replace(ROUTES_CONFIG.BASE_URL);
        }
    }
    _handleChange(event: any) {
      this.setState(
        { [event.target.name]: event.target.value } as LoginState
      );
    }

    _handleSubmit(event: any) {
      return request
                .get(API.BE_LOGIN)
                .auth(this.state.username, this.state.password)
                .then((response: any) => {
                  localStorage.setItem(APP_CONFIG.TOKEN, response.headers[APP_CONFIG.TOKEN]);
                  localStorage.setItem(APP_CONFIG.USER_FULL_NAME, `${response.body.firstName} ${response.body.lastName}`);
                  localStorage.setItem(APP_CONFIG.USER_ROLES, response.body.roles);
                  this.props.history.push(ROUTES_CONFIG.ROOT_URL);
                })
                .catch(error => {
                  console.log('#TODO Treat errors');
                });
    }

    render() {
        return (
            <div className='u-fx u-fx-align-center u-fx-justify-center u-height-full'>
               <Card>
                <CardContent >
                  <Typography variant='headline' component='h2'>
                    Sign in
                  </Typography>
                  <Typography variant='body1' >
                    to continue to AppStarter
                  </Typography>
                  <TextField
                    name='username'
                    label='Username'
                    margin='normal'
                    value={this.state.username}
                    error={this.state.usernameHasError}
                    helperText={this.state.formErrors.username}
                    onChange={event => this._handleChange(event)}
                  />
                  <TextField
                    name='password'
                    label='Password'
                    margin='normal'
                    type='password'
                    value={this.state.password}
                    error={this.state.passwordHasError}
                    helperText={this.state.formErrors.password}
                    onChange={event => this._handleChange(event)}
                  />
                </CardContent>
                <CardActions >
                  <Button
                    color='primary'
                    onClick={event => this._handleSubmit(event)}>
                      Login
                  </Button>
                </CardActions>
              </Card>
          </div>
        );
    }
}
