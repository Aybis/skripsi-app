import axios from './index';
import Cookies from 'js-cookie';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const session = Cookies.get('session');

  if (session) {
    axios.defaults.headers.common['x-auth-token'] = session;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
