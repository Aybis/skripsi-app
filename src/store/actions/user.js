import * as type from '../types/user';
import vmat from '../../config/api/vmat';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

export const setProfile = (profile = {}) => ({
  type: type.PROFILE,
  payload: profile,
});

export const setTokenUser = (token = {}) => ({
  type: type.TOKEN,
  payload: token,
});

export const setLoading = (data) => ({
  type: type.LOADING,
  payload: data,
});

export const setError = (data) => ({
  type: type.ERROR,
  payload: data,
});
export const setMessage = (data) => ({
  type: type.MESSAGE,
  payload: data,
});

export const userLogin = (data) => async (dispatch) => {
  try {
    const result = await vmat.login(data);

    if (result.status === 200) {
      dispatch(setTokenUser(result.data.token));
      dispatch(setProfile(jwt_decode(result.data.token)));
      localStorage.setItem(
        'VMAT:user',
        JSON.stringify({
          token: result.data.token,
        }),
      );
      Cookies.set('session', result.data.token, { expires: 0.5 });

      return {
        status: result.status,
        message: 'Login Successfull!',
        data: result.data,
      };
    }
  } catch (error) {
    dispatch(setError(true));
    return {
      status: error.response.status,
      message: error.response.data.message ?? 'Something Happened!',
      data: null,
    };
  }
};
