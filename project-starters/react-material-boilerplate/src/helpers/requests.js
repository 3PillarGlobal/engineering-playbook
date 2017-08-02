import request from 'superagent';
import APP_CONFIG from '../constants/AppConfig';
import URL_REPO from '../constants/UrlRepo';

let unauthorizedRedirect = request => {
  request.on('response', res => {
    if (res.status === 401) {
      console.dir('Unauthorised acceess');

      if (localStorage.getItem(APP_CONFIG.TOKEN)) {
        localStorage.removeItem(APP_CONFIG.TOKEN);
        window.location = URL_REPO.ROOT_URL;
      } else {
        window.location = URL_REPO.LOGIN;
      }
    } else if (res.status === 403) {
      console.dir('Forbidden acceess');
    }
  });
};

const REQ_HELPER = {
  fetchWithToken: url => {
    let token = localStorage.getItem(APP_CONFIG.TOKEN) || null;
    return request
      .get(url)
      .use(unauthorizedRedirect)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set(APP_CONFIG.TOKEN, token);
  },

  putWithToken: url => {
    let token = localStorage.getItem(APP_CONFIG.TOKEN) || null;
    return request
      .put(url)
      .use(unauthorizedRedirect)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set(APP_CONFIG.TOKEN, token);
  },

  deleteWithToken: url => {
    let token = localStorage.getItem(APP_CONFIG.TOKEN) || null;
    return request
      .delete(url)
      .use(unauthorizedRedirect)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set(APP_CONFIG.TOKEN, token);
  },

  postWithToken: url => {
    let token = localStorage.getItem(APP_CONFIG.TOKEN) || null;
    return request
      .post(url)
      .use(unauthorizedRedirect)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set(APP_CONFIG.TOKEN, token);
  },

  postWithTokenNoContentType: url => {
    let token = localStorage.getItem(APP_CONFIG.TOKEN) || null;
    return request
      .post(url)
      .use(unauthorizedRedirect)
      .set(APP_CONFIG.TOKEN, token);
  }
};

export default REQ_HELPER;
