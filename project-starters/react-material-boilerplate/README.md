AppStarter

## Includes
- Based on Create-react-app [https://github.com/facebookincubator/create-react-app]
- Uses react-router and react-router-dom for routing [https://github.com/ReactTraining/react-router]
- Material-UI (v1.0.0-beta.3) used for look and feel [https://material-ui-1dab0.firebaseapp.com/getting-started/installation]
- Material-UI icons
- Roboto font 

## Instructions
- Clone repository
- Make sure you have `yarn` installed - [https://code.facebook.com/posts/1840075619545360](https://code.facebook.com/posts/1840075619545360)
- Run `yarn install`
- Run the following scripts
  - `yarn start` to bootstrap the app
  - `yarn run build` to generate optimised prod build
  - `yarn test` to run tests
  - `yarn run test-nw` to run tests in "no watch mode" (Useful for CI servers mostly)
  - `yarn run eject` to eject the app (terminate server)

## Functionality
- Login functionality is provided (along with 404, Unauthorized pages).
- ... more to be added here

## Intended source file organization
- Pages
  - Keep unprotected (public) pages under `/public`.
  - Keep protected pages under `/private`.

- Constants
  - Constants, static data models, configuration files, generic form validation rules, server-side URLs go under `/constants`.

- Helpers
  - helpers and utils go under `/helpers`.

- Commonly used components
  - Components that are used by more than one page should go under `/components`.

