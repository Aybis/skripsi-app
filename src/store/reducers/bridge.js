import * as type from '../types/bridge';

const initialState = {
  dataBridgeDomain: {},
  dataNodeByBridgeDomain: {},
  dataInterfaceByBridgeDomain: {},
  name: {},
  loading: false,
  error: false,
  status: 'idle',
  total: 0,
  message: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.LIST_BRIDGE_DOMAIN:
      return {
        ...state,
        dataBridgeDomain: action.payload ?? {},
        total: action.payload.length ?? 0,
        status: 'ok',
      };

    case type.LIST_NODE_BY_BRIDGE_DOMAIN:
      return {
        ...state,
        dataNodeByBridgeDomain: action.payload ?? {},
        status: 'ok',
      };

    case type.LIST_INTERFACE_BY_BRIDGE_DOMAIN:
      return {
        ...state,
        dataInterfaceByBridgeDomain: action.payload ?? {},
        status: 'ok',
      };

    case type.NAME:
      return {
        ...state,
        name: action.payload,
      };
    case type.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case type.ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case type.STATUS_DATA:
      return {
        ...state,
        status: action.payload,
      };

    case type.MESSAGE_DATA:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
}
