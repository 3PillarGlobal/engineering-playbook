import { createStyleSheet } from 'material-ui/styles';

const PRIVATE_PAGE_STYLE = createStyleSheet('privatePageStyle', theme => ({
  root: {
    marginTop: 30,
    width: '100%'
  },
  flex: {
    flex: 1
  },
  button: {
    margin: 0,
    color: '#fff'
  }
}));

export default PRIVATE_PAGE_STYLE;
