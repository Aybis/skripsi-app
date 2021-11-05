import axios from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default (token = null) => {
  if (token) {
    axios.defaults.headers.common.authorization = token;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};
