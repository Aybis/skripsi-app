import {
  LIST_NODE_FABRICS,
  LIST_VXLAN_BY_FABRIC,
  LIST_OSPF_BY_FABRIC,
  STATUS_DATA,
  MESSAGE_DATA,
} from '../types/fabric';

const initialState = {
  dataNodes: {},
  dataVxlanByFabric: {},
  dataOspfByFabric: {},
  status: 'idle',
  total: 0,
  message: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LIST_NODE_FABRICS:
      return {
        ...state,
        dataNodes: action.payload,
        total: action.payload.length ?? 0,
        status: 'ok',
      };

    case LIST_VXLAN_BY_FABRIC:
      return {
        ...state,
        dataVxlanByFabric: action.payload ?? {},
        status: 'ok',
      };

    case LIST_OSPF_BY_FABRIC:
      return {
        ...state,
        dataOspfByFabric: action.payload ?? {},
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
