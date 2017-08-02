import React from 'react';
import { withRouter } from 'react-router';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import VALIDATION_REPO from '../constants/ValidationRepo';
import PUBLIC_PAGE_STYLE from './styles/publicPageStyle';
import APP_CONFIG from '../constants/AppConfig';
import URL_REPO from '../constants/UrlRepo';
import request from 'superagent';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleKeypress = this._handleKeypress.bind(this);
    this._loginCallback = this._loginCallback.bind(this);

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
      this.props.history.replace(URL_REPO.BASE_URL);
    }
  }

  render() {
    return (
      <div className="u-fx u-fx-align-center u-fx-justify-center u-height-full">
        <Card className={this.props.classes.card}>
          <CardContent className={this.props.classes.cardContent}>
            <Typography type="headline" component="h2">
              Sign in
            </Typography>
            <Typography type="body1" className={this.props.classes.subtitle}>
              to continue to AppStarter
            </Typography>
            <TextField
              className={this.props.classes.textfield}
              name="username"
              label="Username"
              margin="normal"
              value={this.state.username}
              error={this.state.usernameHasError}
              helperText={this.state.formErrors.username}
              onChange={event => this._handleKeypress(event)}
            />
            <TextField
              className={this.props.classes.textfield}
              name="password"
              label="Password"
              margin="normal"
              type="password"
              value={this.state.password}
              error={this.state.passwordHasError}
              helperText={this.state.formErrors.password}
              onChange={event => this._handleKeypress(event)}
            />
          </CardContent>
          <CardActions className={this.props.classes.cardActions}>
            <Button
              className={this.props.classes.button}
              raised
              color="primary"
              onClick={event => this._handleSubmit(event)}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }

  _validateForm() {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValue = this.state.username;
    let usernameHasError = this.state.usernameHasError;
    let passwordValue = this.state.password;
    let passwordHasError = this.state.passwordHasError;

    if (usernameValue === '') {
      usernameHasError = true;
      fieldValidationErrors.username = VALIDATION_REPO.REQUIRED;
    } else {
      usernameHasError = false;
      fieldValidationErrors.username = '';
    }

    if (passwordValue === '') {
      passwordHasError = true;
      fieldValidationErrors.password = VALIDATION_REPO.REQUIRED;
    } else if (passwordValue.length < VALIDATION_REPO.MIN_LENGTH_INT) {
      passwordHasError = true;
      fieldValidationErrors.password = VALIDATION_REPO.MIN_LENGTH;
    } else {
      passwordHasError = false;
      fieldValidationErrors.password = '';
    }

    this.setState({
      formErrors: fieldValidationErrors,
      usernameHasError: usernameHasError,
      passwordHasError: passwordHasError
    });

    return !usernameHasError && !passwordHasError;
  }

  _handleKeypress(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  _loginCallback(error, response) {
    if (error) {
      console.log('TODO Sad path');
    } else if (response.statusCode === 200) {
      localStorage.setItem(APP_CONFIG.TOKEN, response.body.username);
      localStorage.setItem(
        APP_CONFIG.USER_FULL_NAME,
        `${response.body.firstName} ${response.body.lastName}`
      );
      localStorage.setItem(APP_CONFIG.USER_ROLES, response.body.roles);
      this.props.history.push(URL_REPO.ROOT_URL);
    }
  }

  _handleSubmit() {
    if (this._validateForm()) {
      return request
        .get(URL_REPO.BE_LOGIN)
        .auth(this.state.username, this.state.password)
        .end(this._loginCallback);
    }
  }
}

export default withStyles(PUBLIC_PAGE_STYLE)(withRouter(Login));
