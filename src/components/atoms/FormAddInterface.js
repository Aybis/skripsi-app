import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { LoadingIcon } from '.';
import { insertInterfaceBridge } from '../../store/actions/bridge';

export default function FormAddInterface({
  handlerModal,
  loading,
  setLoading,
}) {
  const dispatch = useDispatch();
  const BRIDGE = useSelector((state) => state.bridge);

  const [form, setform] = useState({
    interface: '',
    idBridge: '',
    idRouter: '',
  });

  const handlerOnChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    form.idBridge = BRIDGE.selectBridge._id;
    form.idRouter = BRIDGE.selectNodeByBridge._id;
    setLoading(true);
    try {
      const result = await dispatch(insertInterfaceBridge(form));

      if (result.status === 200) {
        swal('Yeay!', result.message, 'success');
        handlerModal(false);
      } else {
        swal('Oh No!', result.message, 'error');
      }
    } catch (error) {
      swal('Oh No!', 'Something Happened!', 'error');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handlerSubmit} className="mt-4">
      <div className="flex gap-4 sm:gap-4 sm:items-start">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 w-44">
          Select Bridge Domain
        </label>
        <div className="mt-1 sm:mt-0 w-full">
          <div className="max-w-lg flex rounded-md">
            <input
              type="text"
              disabled
              value={BRIDGE.selectBridge.bdName}
              className="max-w-lg bg-gray-200 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-medium sm:max-w-xs sm:text-sm border-gray-300 rounded-md placeholder-gray-400 placeholder-opacity-60"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 sm:gap-4 sm:items-start mt-5">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 w-44">
          Select Node
        </label>
        <div className="mt-1 sm:mt-0 w-full">
          <div className="max-w-lg flex rounded-md">
            <input
              type="text"
              disabled
              value={BRIDGE.selectNodeByBridge.routerName}
              className="max-w-lg bg-gray-200 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-medium sm:max-w-xs sm:text-sm border-gray-300 rounded-md placeholder-gray-400 placeholder-opacity-60"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 sm:gap-4 sm:items-start mt-5">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 w-44">
          Select Interface
        </label>
        <div className="mt-1 sm:mt-0 w-full">
          <div className="max-w-lg flex rounded-md">
            <select
              name="interface"
              defaultValue={form.interface || ''}
              onChange={handlerOnChange}
              className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
              <option disabled value="">
                Pilih Interface
              </option>
              {BRIDGE.listInterface.length > 0 &&
                BRIDGE.listInterface.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-4 sm:gap-4 sm:items-start mt-4">
        <span className="block text-sm font-medium text-gray-700 w-44"></span>
        <div className="mt-1 sm:mt-0 w-full">
          {form.interface.length > 0 && (
            <button
              type="submit"
              disabled={loading}
              className="disabled:opacity-40 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {loading && <LoadingIcon />}
              Associate Interface
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
