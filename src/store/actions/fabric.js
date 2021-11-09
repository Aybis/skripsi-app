import {
  LIST_NODE_FABRICS,
  LIST_VXLAN_BY_FABRIC,
  LIST_OSPF_BY_FABRIC,
  STATUS_DATA,
  MESSAGE_DATA,
} from '../types/fabric';

export const fetchListNodes = (data) => ({
  type: LIST_NODE_FABRICS,
  payload: data,
});

export const fetchVxlanByFabric = (data) => ({
  type: LIST_VXLAN_BY_FABRIC,
  payload: data,
});

export const fetchOspfByFabric = (data) => ({
  type: LIST_OSPF_BY_FABRIC,
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
