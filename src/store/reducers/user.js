import * as type from '../types/user';

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.PROFILE:
      return action.payload;

    case type.ERROR:
      return action.payload;

    case type.TOKEN:
      return action.payload;

    case type.LOADING:
      return action.payload;

    case type.MESSAGE:
      return action.payload;

    default:
      return state;
  }
}
