import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import vmat from '../../config/api/vmat';
import {
  fetchListNodeByBridgeDomain,
  statusData,
} from '../../store/actions/vxlan';
import LoadingIcon from './LoadingIcon';

export default function FormAddInterface({ data, idBridge, interfaceList }) {
  const dispatch = useDispatch();
  const [isSubmit, setisSubmit] = useState(false);

  const [form, setform] = useState({
    interface: '',
    idBridge: idBridge,
    idRouter: data.idRouterListModel,
  });

  const handlerOnChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const fetchHandlerNodeByBridge = () => {
    vmat
      .listNodeByBridgeDomain(idBridge)
      .then((res) => {
        dispatch(fetchListNodeByBridgeDomain(res.data.message));
      })
      .catch((err) => {
        dispatch(statusData('error'));
      });
  };

  const handlerSubmit = (event) => {
    setisSubmit(true);
    event.preventDefault();

    console.log(form);
    vmat
      .addInterfaceByBridgeDomain(form)
      .then((res) => {
        swal({
          title: 'Add Successfull',
          text: res.data.message,
          icon: 'success',
        });
        fetchHandlerNodeByBridge();
        setisSubmit(false);
      })
      .catch((err) => {
        console.log(err.response);
        swal({
          title: 'Something Happened!',
          text: err.response.data.message ?? 'Something happened!',
          icon: 'error',
        });
        setisSubmit(false);
      });
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
              value={data.bdName}
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
              value={data.routerName}
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
              {interfaceList.interfaceList.length > 0 &&
                interfaceList.interfaceList.map((item, index) => (
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
          <button
            type="submit"
            disabled={isSubmit}
            className="disabled:opacity-40 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {isSubmit && <LoadingIcon />}
            Associate Node
          </button>
        </div>
      </div>
    </form>
  );
}
