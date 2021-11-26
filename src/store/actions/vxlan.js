import {
  LIST_BRIDGE_DOMAIN,
  LIST_NODE_BY_BRIDGE_DOMAIN,
  LIST_INTERFACE_BY_BRIDGE_DOMAIN,
  STATUS_DATA,
  MESSAGE_DATA,
} from '../types/vxlan';

export const fetchListBridgeDomain = (data) => ({
  type: LIST_BRIDGE_DOMAIN,
  payload: data,
});

export const fetchListNodeByBridgeDomain = (data) => ({
  type: LIST_NODE_BY_BRIDGE_DOMAIN,
  payload: data,
});

export const fetchListInterfaceByBridgeDomain = (data) => ({
  type: LIST_INTERFACE_BY_BRIDGE_DOMAIN,
  payload: data,
});

export const statusData = (data) => ({
  type: STATUS_DATA,
  payload: data,
});

export const messageData = (data) => ({
  type: MESSAGE_DATA,
  payload: data,
});
