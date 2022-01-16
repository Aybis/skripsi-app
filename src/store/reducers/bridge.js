import * as type from '../types/bridge';

const initialState = {
  //new object
  listBridge: {},
  listNodeByBridge: {},
  listInterfaceByBridge: {},
  selectNodeByBridge: {},
  selectInterfaceByBridge: {},
  listInterface: {},
  selectBridge: {},
  total: 0,
  loading: false,
  error: false,
  message: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    //new object

    case type.LIST_BRIDGE:
      return {
        ...state,
        listBridge: action.payload,
        total: action.length,
      };

    case type.LIST_NODE_BY_BRIDGE:
      return {
        ...state,
        listNodeByBridge: action.payload,
      };

    case type.LIST_SELECT_NODE_BY_BRIDGE:
      return {
        ...state,
        selectNodeByBridge: action.payload,
      };

    case type.LIST_INTERFACE_BY_BRIDGE:
      return {
        ...state,
        listInterfaceByBridge: action.payload,
      };

    case type.LIST_INTERFAE:
      return {
        ...state,
        listInterface: action.payload,
      };

    case type.LIST_SELECT_INTERFACE_BY_BRIDGE:
      return {
        ...state,
        selectInterfaceByBridge: action.payload,
      };

    case type.SELECT_BRIDGE:
      return {
        ...state,
        selectBridge: action.payload,
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

    case type.MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
}
