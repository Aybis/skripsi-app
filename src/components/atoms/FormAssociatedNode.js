import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { LoadingIcon, Modals } from '.';
import vmat from '../../config/api/vmat';
import { fetchListNodeByBridgeDomain } from '../../store/actions/bridge';

export default function FormAssociatedNode({ show, handlerShow }) {
  const FABRIC = useSelector((state) => state.fabric);
  const BRIDGE = useSelector((state) => state.bridge);
  const dispatch = useDispatch();
  const [isSubmit, setisSubmit] = useState(false);

  const [form, setform] = useState({
    idBridgeDomain: BRIDGE?.name?._id,
    idRouter: '',
  });

  const handlerOnChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  console.log(BRIDGE.name);

  const handlerSubmit = (event) => {
    event.preventDefault();
    setisSubmit(true);
    vmat
      .addNodeByBridgeDomain(form)
      .then((res) => {
        swal({
          title: res.data.message,
          icon: 'success',
        });
        setisSubmit(false);
        dispatch(fetchListNodeByBridgeDomain(BRIDGE?.name));
        form.idRouter = '';
        handlerShow(false);
      })
      .catch((err) => {
        swal({
          title: 'Oh No!',
          text: err.response.data.message ?? 'Something Happened!',
          icon: 'error',
        });
        setisSubmit(false);
      });
  };

  useEffect(() => {}, [dispatch, BRIDGE]);

  return (
    <Modals
      show={show}
      handlerShow={handlerShow}
      title={`Associated Node ${BRIDGE.name.bdName}`}
      isLoading={isSubmit}>
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
                value={BRIDGE.name.bdName}
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
              <select
                name="idRouter"
                defaultValue={form.idRouter || ''}
                onChange={handlerOnChange}
                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                <option disabled value="">
                  Pilih Node
                </option>
                {FABRIC.dataNodes.length > 0 &&
                  FABRIC.dataNodes.map((node) => (
                    <option key={node._id} value={node._id}>
                      {node.routerName}
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
    </Modals>
  );
}
