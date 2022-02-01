import vmat from '../../config/api/vmat';
import { setTokenHeader } from '../../config/axios';
import * as type from '../types/ibgp';

export const setListIbgp = (data) => ({
  type: type.LIST_IBGP,
  payload: data,
});
export const setIbgpSelect = (data) => ({
  type: type.IBGP_SELECTED,
  payload: data,
});
export const setLoading = (data) => ({
  type: type.LOADING,
  payload: data,
});
export const setMessage = (data) => ({
  type: type.MESSAGE,
  payload: data,
});
export const setError = (data) => ({
  type: type.ERROR,
  payload: data,
});
export const setStatus = (data) => ({
  type: type.STATUS,
  payload: data,
});

export const fetchListDataIbgp = () => async (dispatch) => {
  setTokenHeader();
  dispatch(setLoading(true));
  const result = await vmat
    .listIbgp()
    .then((res) => {
      dispatch(setListIbgp(res.data.message));
      dispatch(setLoading(false));
      return res;
    })
    .catch((err) => {
      dispatch(setLoading(false));

      return err;
    });

  return result;
};

export const insertIbgp = (data) => async (dispatch) => {
  setTokenHeader();

  try {
    const result = await vmat
      .addIbgp(data)
      .then((res) => {
        dispatch(fetchListDataIbgp());
        return {
          status: res.status ?? 200,
          message: res.data.message ?? 'Add IBGP Successfully!',
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

export const deleteIbgp = (data) => async (dispatch) => {
  setTokenHeader();

  try {
    const result = await vmat
      .deleteIbgp(data)
      .then((res) => {
        dispatch(fetchListDataIbgp());
        return {
          status: res.status ?? 200,
          message: res.data.message ?? 'Delete IBGP Successfully!',
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
