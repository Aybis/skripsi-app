import axios from 'axios';

// import errorHandler from './errorHandler';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}`,
});

// instance.interceptors.request.use(
//   async (config) => {
//     const session = JSON.parse(localStorage.getItem('VMAT:user'));

//     if (session.token) {
//       config.headers.Authorization = session.token;
//     }
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   },
// );

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export { default as setTokenHeader } from './setTokenHeader';

export default instance;
