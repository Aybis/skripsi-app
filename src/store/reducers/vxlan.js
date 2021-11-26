import {
  LIST_BRIDGE_DOMAIN,
  LIST_NODE_BY_BRIDGE_DOMAIN,
  LIST_INTERFACE_BY_BRIDGE_DOMAIN,
  STATUS_DATA,
  MESSAGE_DATA,
} from '../types/vxlan';

const initialState = {
  dataBridgeDomain: {},
  dataNodeByBridgeDomain: {},
  dataInterfaceByBridgeDomain: {},
  status: 'idle',
  total: 0,
  message: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LIST_BRIDGE_DOMAIN:
      return {
        ...state,
        dataBridgeDomain: action.payload ?? {},
        total: action.payload.length ?? 0,
        status: 'ok',
      };

    case LIST_NODE_BY_BRIDGE_DOMAIN:
      return {
        ...state,
        dataNodeByBridgeDomain: action.payload ?? {},
        status: 'ok',
      };

    case LIST_INTERFACE_BY_BRIDGE_DOMAIN:
      return {
        ...state,
        dataInterfaceByBridgeDomain: action.payload ?? {},
        status: 'ok',
      };

    case STATUS_DATA:
      return {
        ...state,
        status: action.payload,
      };

    case MESSAGE_DATA:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
}
