import vmat from '../../config/api/vmat';
import { setTokenHeader } from '../../config/axios';
import * as type from '../types/bridge';

export const setListBridgeDomain = (data) => ({
  type: type.LIST_BRIDGE_DOMAIN,
  payload: data,
});

export const setListNodeByBridgeDomain = (data) => ({
  type: type.LIST_NODE_BY_BRIDGE_DOMAIN,
  payload: data,
});

export const setListInterfaceByBridgeDomain = (data) => ({
  type: type.LIST_INTERFACE_BY_BRIDGE_DOMAIN,
  payload: data,
});

export const statusData = (data) => ({
  type: type.STATUS_DATA,
  payload: data,
});

export const messageData = (data) => ({
  type: type.MESSAGE_DATA,
  payload: data,
});

export const setName = (data) => ({
  type: type.NAME,
  payload: data,
});
export const setLoading = (data) => ({
  type: type.LOADING,
  payload: data,
});
export const setError = (data) => ({
  type: type.ERROR,
  payload: data,
});

export const fetchListBridgeDomain = (data) => async (dispatch) => {
  setLoading(true);
  setTokenHeader();
  await vmat
    .getListBridgeDomain()
    .then((response) => {
      dispatch(setListBridgeDomain(response.data.message));
    })
    .catch((err) => {
      dispatch(statusData('error'));
    });
};

export const fetchListNodeByBridgeDomain = (data) => async (dispatch) => {
  setLoading(true);
  setTokenHeader();
  console.log('test', data);
  await vmat
    .listNodeByBridgeDomain(data._id)
    .then((res) => {
      dispatch(setListBridgeDomain(res.data.message));
    })
    .catch((err) => {
      dispatch(setError(true));
      dispatch(statusData('error'));
    });
};
