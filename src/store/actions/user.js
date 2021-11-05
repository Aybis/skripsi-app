import { PROFILE, TOKEN } from '../types/user';

export const getProfile = (profile = {}) => ({
  type: PROFILE,
  payload: profile,
});

export const getToken = (token = {}) => ({
  type: TOKEN,
  payload: token,
});
