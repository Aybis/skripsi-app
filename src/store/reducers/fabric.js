import * as type from '../types/fabric';

const initialState = {
  dataNodes: {},
  dataVxlanByFabric: {},
  dataOspfByFabric: {},
  listBridge: {},
  nameBridge: '',
  listIbgp: {},
  nameIbgp: '',
  detailTunnel: {},
  tunnel: false,
  status: 'idle',
  total: 0,
  message: '',
  loading: false,
  error: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case type.LIST_NODE_FABRICS:
      return {
        ...state,
        dataNodes: action.payload,
        total: action.payload.length ?? 0,
        status: 'ok',
      };

    case type.LIST_VXLAN_BY_FABRIC:
      return {
        ...state,
        dataVxlanByFabric: action.payload ?? {},
        status: 'ok',
      };

    case type.DETAIL_TUNNEL:
      return {
        ...state,
        detailTunnel: action.payload ?? {},
        status: 'ok',
      };

    case type.LIST_OSPF_BY_FABRIC:
      return {
        ...state,
        dataOspfByFabric: action.payload ?? {},
        status: 'ok',
      };

    case type.BRIDGE_NAME:
      return {
        ...state,
        nameBridge: action.payload,
      };

    case type.IBGP_NAME:
      return {
        ...state,
        nameIbgp: action.payload,
      };

    case type.LIST_BRIDGE:
      return {
        ...state,
        listBridge: action.payload,
      };

    case type.LIST_IBGP:
      return {
        ...state,
        listIbgp: action.payload,
      };

    case type.TUNNEL:
      return {
        ...state,
        tunnel: action.payload,
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
