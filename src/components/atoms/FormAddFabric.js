import React, { useState } from 'react';
import vmat from '../../config/api/vmat';
import { setTokenHeader } from '../../config/axios';

export default function FormAddFabric({ stateModal }) {
  const [form, setForm] = useState({
    routerName: '',
    management: '',
    routerUsername: '',
    routerPassword: '',
    role: '',
    nhrpSecret: '',
    bgp: {
      localAs: 0,
      remoteAs: 0,
    },
  });

  const handlerOnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handlerSubmitAdd = (event) => {
    event.preventDefault();
    // stateModal(false);

    // setTokenHeader();
    console.log(form);
  };

  return (
    <form onSubmit={handlerSubmitAdd} className="mt-4">
      <div className="space-y-6 sm:space-y-5">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="router-name"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Router Name
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
              type="text"
              name="routerName"
              value={form.routerName}
              onChange={handlerOnChange}
              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="management"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Management
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
              type="text"
              name="management"
              value={form.management}
              onChange={handlerOnChange}
              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="router-username"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Router Username
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
              name="routerUsername"
              value={form.routerUsername}
              onChange={handlerOnChange}
              type="text"
              className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="router-password"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Router Password
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
              name="routerPassword"
              value={form.routerPassword}
              onChange={handlerOnChange}
              type="password"
              className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Role
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <select
              name="role"
              defaultValue={form.role}
              onChange={handlerOnChange}
              className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
              <option disabled value="">
                Pilih Role
              </option>
              <option value="hub">HUB</option>
              <option value="spoke">SPOKE</option>
            </select>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="nhrp-secret"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            NHRP Secret
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
              type="password"
              name="nhrpSecret"
              value={form.nhrpSecret}
              onChange={handlerOnChange}
              autoComplete="street-address"
              className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="bgp-local"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            BGP Local-AS
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
              type="number"
              name="localAs"
              value={form.bgp.localAs}
              onChange={handlerOnChange}
              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="bgp-remote"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            BGP Remote-AS
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
              type="number"
              name="remoteAs"
              value={form.bgp.remoteAs}
              onChange={handlerOnChange}
              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <button
              type="submit"
              className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Add Node to Fabric
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
