import React, { useState } from 'react';

export default function FormAssociatedNode({ data }) {
  console.log(data);

  const [form, setform] = useState({
    idBridgeDomain: '618d1fbfa9b5be27b97cacde',
    idRouter: '618b7c062bfef9370417ffac',
  });

  const handlerOnChange = (event) => {
    console.log(event);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
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
            <select
              name="role"
              disabled
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
              name="role"
              defaultValue={''}
              className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
              <option disabled value="">
                Pilih Node
              </option>
              <option value="spoke">JKT-SPOKE</option>
              <option value="hub">SBY-SPOKE</option>
              <option value="spoke">SMG-SPOKE</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-4 sm:gap-4 sm:items-start mt-5">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 w-44">
          Interface to associate
        </label>
        <div className="mt-1 sm:mt-0 w-full">
          <div className="max-w-lg flex rounded-md">
            <select
              name="role"
              defaultValue={''}
              className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
              <option disabled value="">
                Pilih Interface
              </option>
              <option value="eth1">eth1</option>
              <option value="eth2">eth2</option>
              <option value="eth3">eth3</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex gap-4 sm:gap-4 sm:items-start mt-4">
        <span className="block text-sm font-medium text-gray-700 w-44"></span>
        <div className="mt-1 sm:mt-0 w-full">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Associate Node
          </button>
        </div>
      </div>
    </form>
  );
}
