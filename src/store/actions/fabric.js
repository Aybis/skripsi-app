import vmat from '../../config/api/vmat';
import { setTokenHeader } from '../../config/axios';
import ToastHandler from '../../helpers/toast';
import * as type from '../types/fabric';

export const fetchListNodes = (data) => ({
  type: type.LIST_NODE_FABRICS,
  payload: data,
});

export const fetchVxlanByFabric = (data) => ({
  type: type.LIST_VXLAN_BY_FABRIC,
  payload: data,
});

export const fetchOspfByFabric = (data) => ({
  type: type.LIST_OSPF_BY_FABRIC,
  payload: data,
});

export const setDetailTunnel = (data) => ({
  type: type.DETAIL_TUNNEL,
  payload: data,
});

export const setBridgeName = (data) => ({
  type: type.BRIDGE_NAME,
  payload: data,
});

export const setIbgpName = (data) => ({
  type: type.IBGP_NAME,
  payload: data,
});

export const setListBridge = (data) => ({
  type: type.LIST_BRIDGE,
  payload: data,
});

export const setListIbgp = (data) => ({
  type: type.LIST_IBGP,
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
export const setTunnel = (data) => ({
  type: type.TUNNEL,
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

export const checkUnderlay = () => async (dispatch) => {
  dispatch(setLoading(true));

  dispatch(setTunnel(false));
  setTokenHeader();
  return await vmat
    .checkUndelay()
    .then((response) => {
      dispatch(setLoading(false));
      dispatch(setTunnel(response.data.success ? false : true));
      return response;
    })
    .catch((err) => {
      dispatch(setLoading(false));

      return err;
    });
};

export const fetchNode = () => async (dispatch) => {
  setTokenHeader();

  return await vmat
    .getNodes()
    .then((response) => {
      dispatch(fetchListNodes(response.data.message));
      dispatch(messageData('ok'));
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchListBridge = (data) => async (dispatch) => {
  dispatch(setBridgeName(data.routerName));
  dispatch(setLoading(true));
  setTokenHeader();

  await vmat
    .fetchListBridgeByFabric(data._id)
    .then((response) => {
      dispatch(setListBridge(response.data.message));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));

      ToastHandler('err', err?.response?.message ?? 'Something happened');
    });
};

export const fetchLisIbgp = (data) => async (dispatch) => {
  setTokenHeader();
  dispatch(setBridgeName(data.routerName));
  dispatch(setLoading(true));
  return await vmat
    .fetchListIBGPByFabric(data._id)
    .then((res) => {
      dispatch(setLoading(false));
      dispatch(setListIbgp(res.data.message));
      return res;
    })
    .catch((err) => {
      dispatch(setLoading(false));
      return err;
    });
};

export const fetchDataDetailTunnelActive = (data) => async (dispatch) => {
  setTokenHeader();
  dispatch(setLoading(true));

  await vmat
    .detailUnderlay()
    .then((res) => {
      dispatch(setLoading(false));
      dispatch(setDetailTunnel(res.data.message));
      return res;
    })
    .catch((err) => {
      dispatch(setLoading(false));

      return err;
    });
};
