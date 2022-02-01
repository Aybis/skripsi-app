import * as type from '../types/ibgp';

const initialState = {
  listIbgp: {},
  ibgpSelect: {},
  loading: false,
  error: false,
  message: '',
  status: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.LIST_IBGP:
      return {
        ...state,
        listIbgp: action.payload ?? {},
      };
    case type.IBGP_SELECTED:
      return {
        ...state,
        ibgpSelect: action.payload ?? {},
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
    case type.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case type.STATUS:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
}
