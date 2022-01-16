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
  dispatch(setTunnel(false));
  setTokenHeader();
  await vmat
    .checkUndelay()
    .then((response) => {
      dispatch(setTunnel(false));
    })
    .catch((err) => {
      dispatch(setTunnel(true));
    });
};

export const fetchNode = () => async (dispatch) => {
  setTokenHeader();

  await vmat
    .getNodes()
    .then((response) => {
      dispatch(fetchListNodes(response.data.message));
      dispatch(messageData('ok'));
    })
    .catch((err) => {
      dispatch(messageData('error'));
      ToastHandler(
        'error',
        err?.response?.data?.message ?? 'Something happenned',
      );
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
