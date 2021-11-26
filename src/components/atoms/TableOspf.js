import {
  DatabaseIcon,
  PlusIcon,
  PlusSmIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import LoadingIcon from './LoadingIcon';

function TableOspf({ handlerOpenModal, handlerAssociateNode }) {
  const history = useHistory();

  const handlerClickData = (item) => {
    history.push(`/bridge/associate/${item._id}`);
  };
  const BRIDGE = useSelector((state) => state.bridge);
  const handlerDelete = (item) => {
    swal({
      title: 'Are you sure?',
      text: `Once deleted, you will not be able to recover this ${item.bdName}!`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Poof! Your Bridge Domain has been deleted!', {
          icon: 'success',
        });
      } else {
        swal('Your Bridge Domain is safe!');
      }
    });
  };

  return (
    <div className="mt-8">
      <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
        <div className="sm:flex items-center justify-between">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            List Bridge Domain
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
        {BRIDGE.status === 'idle' ? (
          <div className="flex justify-center items-center">
            <LoadingIcon color="text-apps-primary" height={8} width={8} />
          </div>
        ) : (
          <table className="w-full whitespace-nowrap">
            <thead className="bg-warmGray-50">
              <tr className="h-16 w-full text-sm leading-none text-gray-500 uppercase">
                <th className="font-semibold tracking-wide text-left pl-4">
                  No
                </th>
                <th className="font-semibold tracking-wide text-left pl-12">
                  Bridge Domain
                </th>
                <th className="font-semibold tracking-wide text-left pl-12">
                  Bridge ID
                </th>
                <th className="font-semibold tracking-wide text-left pl-20">
                  VNI
                </th>
                <th className="font-semibold tracking-wide text-left pl-20"></th>
              </tr>
            </thead>
            <tbody className="w-full">
              {BRIDGE.total > 0 ? (
                BRIDGE.dataBridgeDomain.map((item, index) => (
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
                            {item.bdName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {item._id}
                      </p>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm text-center font-medium leading-none text-gray-800">
                        {item.vniId}
                      </p>
                    </td>
                    <td className="pl-7 2xl:px-0  py-2">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handlerAssociateNode(item)}
                          className="flex gap-1 items-center text-green-600 hover:text-green-700 font-medium">
                          <PlusIcon className="h-4 w-4 " />
                          Associate Node
                        </button>
                        <button
                          onClick={() => handlerDelete(item)}
                          className="flex gap-1 items-center text-red-600 hover:text-red-900 font-medium">
                          <TrashIcon className="h-4 w-4 " />
                          Delete Bridge
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-2 px-4">
                    Data Kosong
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TableOspf;
