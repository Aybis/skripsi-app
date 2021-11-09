import axios from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const session = JSON.parse(localStorage.getItem('VMAT:user'));

  if (session) {
    axios.defaults.headers.common['x-auth-token'] = session.token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
