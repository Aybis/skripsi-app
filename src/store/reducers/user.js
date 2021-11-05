import { PROFILE } from '../types/user';

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE:
      return action.payload;

    default:
      return state;
  }
}
