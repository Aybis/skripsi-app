import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react';

export default function ChildTable({ data }) {
  return (
    <>
      <div className="bg-white px-4 md:px-10 pt-4 md:pt-4 pb-5 overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-500">
              <th className="font-medium tracking-wide text-left pl-4">No</th>
              <th className="font-medium tracking-wide text-left pl-12">
                Associated Node
              </th>
              <th className="font-medium tracking-wide text-left pl-12">
                Interface
              </th>
              <th className="font-medium tracking-wide text-left pl-20">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {Array.from({ length: data }).map((item, index) => (
              <tr
                key={Math.random()}
                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                <td className="pl-4">
                  <p className="text-sm font-medium leading-none text-gray-400">
                    {index + 1}
                  </p>
                </td>
                <td className="pl-4">
                  <div className="flex items-center">
                    <div className="pl-4">
                      <p className="font-semibold text-gray-800 tracking-wide">
                        JKT-01-GW
                      </p>
                    </div>
                  </div>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-600">
                    eth0, eth2, eth3, eth4
                  </p>
                </td>
                <td className="pl-20 pr-6">
                  <button className="inline-flex  gap-1 items-center text-green-500 hover:text-green-900 font-medium">
                    <PencilAltIcon className="h-4 w-4 " /> Edit
                  </button>
                  <button className="ml-6 inline-flex gap-1 items-center text-red-600 hover:text-red-900 font-medium">
                    <TrashIcon className="h-4 w-4 " /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
