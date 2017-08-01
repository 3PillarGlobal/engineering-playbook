import { createStyleSheet } from 'material-ui/styles';

const PUBLIC_PAGE_STYLE = createStyleSheet('Login', theme => ({
  card: {
    width: '30rem'
  },
  cardContent: {
    padding: '2rem'
  },
  subtitle: { color: theme.palette.text.secondary },
  textfield: {
    width: '100%'
  },
  cardActions: {
    padding: '0 2rem 2rem 2rem',
    justifyContent: 'flex-end',
    height: 'auto'
  },
  button: {
    margin: 0,
    color: '#fff'
  }
}));

export default PUBLIC_PAGE_STYLE;
