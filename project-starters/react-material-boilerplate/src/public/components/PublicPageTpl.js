import React from 'react';
import { withRouter } from 'react-router';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import APP_CONFIG from '../../constants/AppConfig';
import URL_REPO from '../../constants/UrlRepo';
import PUBLIC_PAGE_STYLE from '../styles/publicPageStyle';

const PublicPageTpl = props =>
  <div className="u-fx u-fx-align-center u-fx-justify-center u-height-full">
    <Card className={props.classes.card}>
      <CardContent className={props.classes.cardContent}>
        <Typography type="headline" component="h2">
          {props.title}
        </Typography>
        <Typography type="body1" className={props.classes.subtitle}>
          {props.subtitle}
        </Typography>
      </CardContent>
      <CardActions className={props.classes.cardActions}>
        <Button
          className={props.classes.button}
          raised
          color="primary"
          onClick={() => {
            localStorage.getItem(APP_CONFIG.TOKEN)
              ? props.history.replace(URL_REPO.BASE_URL)
              : props.history.replace(URL_REPO.LOGIN);
          }}
        >
          {props.redirectTitle}
        </Button>
      </CardActions>
    </Card>
  </div>;

export default withStyles(PUBLIC_PAGE_STYLE)(withRouter(PublicPageTpl));
