import vmat from '../../config/api/vmat';
import { setTokenHeader } from '../../config/axios';
import * as type from '../types/bridge';

export const setListBridge = (data) => ({
  type: type.LIST_BRIDGE,
  payload: data,
});

export const setListNodeByBridge = (data) => ({
  type: type.LIST_NODE_BY_BRIDGE,
  payload: data,
});

export const setListSelectNodeByBridge = (data) => ({
  type: type.LIST_SELECT_NODE_BY_BRIDGE,
  payload: data,
});

export const setSelectBridge = (data) => ({
  type: type.SELECT_BRIDGE,
  payload: data,
});

export const setInterface = (data) => ({
  type: type.LIST_INTERFAE,
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

export const setMessage = (data) => ({
  type: type.MESSAGE,
  payload: data,
});

export const fetchListInterfaceNode = (data) => async (dispatch) => {
  setTokenHeader();

  const result = await vmat
    .getInterfaceNode(data)
    .then((res) => {
      dispatch(setListSelectNodeByBridge(res.data.message));
      dispatch(setInterface(res.data.message.interfaceList ?? {}));
    })
    .catch((err) => {
      dispatch(setError(true));
    });

  return result;
};

export const fetchListBridgeDomain = () => async (dispatch) => {
  dispatch(setLoading(true));
  setTokenHeader();
  const result = await vmat
    .getListBridgeDomain()
    .then((response) => {
      dispatch(setListBridge(response.data.message ?? {}));
      return response.data;
    })
    .catch((err) => {
      dispatch(setMessage('error'));
      return err;
    });

  dispatch(setLoading(false));
  return result;
};

export const fetchListNodeByBridgeDomain = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log(data);
  setTokenHeader();
  await vmat
    .listNodeByBridgeDomain(data)
    .then((res) => {
      dispatch(setListNodeByBridge(res.data.message));
    })
    .catch((err) => {
      dispatch(setError(true));
      dispatch(setMessage('error'));
    });
  dispatch(setLoading(false));
};

export const associateNode = (data) => async (dispatch) => {
  setTokenHeader();
  try {
    const result = await vmat
      .addNodeByBridgeDomain(data)
      .then((res) => {
        dispatch(fetchListNodeByBridgeDomain(data.idBridgeDomain));
        return {
          status: res.status,
          message: res.data.message ?? 'Associated Node Successfully!',
        };
      })
      .catch((err) => {
        return {
          status: err?.response?.status ?? 400,
          message: err?.response?.data?.message ?? 'Something Happened!',
        };
      });

    return result;
  } catch (error) {
    return {
      status: error.status ?? 400,
      message: error?.message ?? 'Somehing Happened!',
    };
  }
};

export const deAssociatedNode = (data) => async (dispatch) => {
  setTokenHeader();
  try {
    const result = await vmat
      .deassociateNodeByBridgeDomain({
        idBridgeDomain: data.idBridgeDomain,
        idRouter: data.idRouter,
      })
      .then((res) => {
        dispatch(fetchListNodeByBridgeDomain(data.idBridgeDomain));
        return {
          status: res.status ?? 200,
          message: res?.data?.message ?? 'Deassociated Node Succesfully!',
        };
      })
      .catch((err) => {
        dispatch(setError(true));
        dispatch(setMessage('error'));
        return {
          status: err?.response?.status ?? 400,
          message: err?.response?.data?.message ?? 'Something Happened!',
        };
      });

    return result;
  } catch (error) {
    return {
      status: error.status ?? 400,
      message: error?.response?.data?.message ?? 'Something Happened!',
    };
  }
};

export const insertBridge = (data) => async (dispatch) => {
  setTokenHeader();

  try {
    const result = await vmat
      .addBridgeDomain({
        bdName: `BD_${data.bdName}`,
        vniId: data.vniId,
      })
      .then((res) => {
        dispatch(fetchListBridgeDomain());
        return {
          status: res.status ?? 200,
          message: res.data.message ?? 'Add Bridge Successfully!',
        };
      })
      .catch((err) => {
        dispatch(setError(true));
        dispatch(
          setMessage(err?.response?.data?.message ?? 'Something Happened'),
        );

        return {
          status: err.response.status ?? 400,
          message: err?.response?.data?.message ?? 'Something Happened!',
        };
      });
    return result;
  } catch (error) {
    return {
      status: error.status ?? 400,
      message: 'Something Happened!',
    };
  }
};

export const deleteBridge = (data) => async (dispatch) => {
  setTokenHeader();
  try {
    const result = await vmat
      .deleteBridgeDomain({
        idBridge: data.idBridge,
      })
      .then((res) => {
        dispatch(fetchListBridgeDomain());
        return {
          status: res.status ?? 200,
          message: 'Delete Bridge Succesfully!',
        };
      })
      .catch((err) => {
        return {
          status: err?.response?.status ?? 400,
          message: err?.response?.data?.message ?? 'Something Happened!',
        };
      });

    return result;
  } catch (error) {
    return {
      status: error.status ?? 400,
      message: error?.response?.data?.message ?? 'Something Happened!',
    };
  }
};

export const insertInterfaceBridge = (data) => async (dispatch) => {
  setLoading(true);
  setTokenHeader();
  try {
    const result = await vmat
      .addInterfaceByBridgeDomain(data)
      .then((res) => {
        dispatch(fetchListNodeByBridgeDomain({ _id: data.idBridge }));
        dispatch(fetchListInterfaceNode(data.idRouter));
        return {
          status: res.status ?? 200,
          message: res.data.message ?? 'Add Bridge Successfully!',
        };
      })
      .catch((err) => {
        return {
          status: err?.response?.status ?? 400,
          message: err?.response?.data?.message ?? 'Something Happened!',
        };
      });

    return result;
  } catch (error) {
    return {
      status: error.status ?? 400,
      message: error?.response?.data?.message ?? 'Something Happened!',
    };
  }
};
