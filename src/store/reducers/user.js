import * as type from '../types/user';

const initialState = {
  profile: {},
  token: '',
  loading: false,
  error: false,
  message: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    case type.TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case type.ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case type.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case type.MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
}
