import {
  ClipboardListIcon,
  DatabaseIcon,
  PlusSmIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import React from 'react';

function TableOspf({ handlerOpenModal, handlerClickData, data, title }) {
  return (
    <div className="mt-8">
      <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
        <div className="sm:flex items-center justify-between">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            List {title}
          </p>
          <div>
            <button
              onClick={handlerOpenModal}
              className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-center justify-center gap-2 px-6 py-3 bg-apps-primary hover:bg-blue-600 focus:outline-none rounded">
              <PlusSmIcon className="h-5 w-5 text-white" />
              <p className="text-sm font-medium leading-none text-white">
                Add Bridge Domain
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-500">
              <th className="font-medium tracking-wide text-left pl-4">No</th>
              <th className="font-medium tracking-wide text-left pl-12">
                Bridge Domain
              </th>
              <th className="font-medium tracking-wide text-left pl-12">
                Bridge ID
              </th>
              <th className="font-medium tracking-wide text-left pl-20">VNI</th>
              <th className="font-medium tracking-wide text-left pl-20"></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data.map((item, index) => (
              <tr
                key={Math.random()}
                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                <td className="pl-4">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {index + 1}
                  </p>
                </td>
                <td
                  className="pl-4 cursor-pointer"
                  onClick={() => handlerClickData(item)}>
                  <div className="flex items-center">
                    <div className="w-10 h-10">
                      <DatabaseIcon className="text-blue-600 h-8 w-8" />
                    </div>
                    <div className="pl-4">
                      <p className="font-semibold text-blue-600 tracking-wide">
                        {item.name}
                      </p>
                      <p className="text-xs leading-3 text-blue-400 pt-2">
                        Aplikasi {item.aplikasi}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {item.bridge_id}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {item.vni}
                  </p>
                  <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                    <div className="w-6 h-3 bg-green-400 rounded-full" />
                  </div>
                </td>
                <td className="px-7 2xl:px-0 flex flex-col gap-2 py-2">
                  <button className="flex gap-1 items-center text-green-600 hover:text-green-700 font-medium">
                    <ClipboardListIcon className="h-4 w-4 " />
                    View
                  </button>
                  <button className="flex gap-1 items-center text-red-600 hover:text-red-900 font-medium">
                    <TrashIcon className="h-4 w-4 " />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableOspf;
