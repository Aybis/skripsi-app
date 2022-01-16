import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { insertBridge } from '../../store/actions/bridge';
import LoadingIcon from './LoadingIcon';

export default function FormAddBridgeDomain({
  loading,
  setLoading,
  handlerModal,
}) {
  const dispatch = useDispatch();

  const [form, setform] = useState({
    bdName: '',
    vniId: '',
  });

  const handlerOnChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handlerSubmitAddBridgeDomain = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await dispatch(insertBridge(form));
      if (result.status === 200) {
        swal({
          title: 'Yeay',
          text: 'Bridge Domain Added Sucessfully!',
          icon: 'success',
        });
        handlerModal(false);
      } else {
        swal({
          title: 'Oh No!',
          text: result.message,
          icon: 'error',
        });
      }
    } catch (error) {
      swal({
        title: 'Oh No!',
        text: 'Something Happened!',
        icon: 'error',
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlerSubmitAddBridgeDomain} className="mt-4">
      <div className="flex gap-4 sm:gap-4 sm:items-start">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 w-36">
          Bridge Name
        </label>
        <div className="mt-1 sm:mt-0 w-full">
          <div className="max-w-lg flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              BD_
            </span>
            <input
              type="text"
              name="bdName"
              placeholder="BILLING"
              value={form.bdName}
              required
              onChange={handlerOnChange}
              className="flex-1 block w-full placeholder-gray-300 focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 sm:gap-4 sm:items-start mt-5">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 w-36">
          VNI ID
        </label>
        <div className="mt-1 sm:mt-0 w-full">
          <div className="max-w-lg flex rounded-md shadow-sm">
            <input
              type="number"
              name="vniId"
              placeholder="10"
              required
              value={form.vniId}
              onChange={handlerOnChange}
              className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 placeholder-gray-300 rounded-md sm:text-sm border-gray-300"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 sm:gap-4 sm:items-start mt-4">
        <span className="block text-sm font-medium text-gray-700 w-36"></span>
        <div className="mt-1 sm:mt-0 w-full">
          {form.bdName.length > 0 && form.vniId.length > 0 && (
            <button
              type="submit"
              disabled={loading}
              className="disabled:opacity-50 inline-flex gap-2 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {loading && <LoadingIcon />}
              Add Bridge Domain
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
