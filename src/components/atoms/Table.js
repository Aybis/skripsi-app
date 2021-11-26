import {
  PlusSmIcon,
  ServerIcon,
  TrashIcon,
  ViewGridAddIcon,
} from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import LoadingIcon from './LoadingIcon';

export default function Table({
  title,
  handlerOpenModal,
  handlerDetailDataOSPFOrVXLAN,
  handlerViewVxlanById,
  handlerDelete,
}) {
  const FABRIC = useSelector((state) => state.fabric);

  return (
    <>
      <div className="px-4 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg">
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
                Add Node to Fabric
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="overflow-x-auto">
          <div className="py-2 pb-8 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Node
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tunnel
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      VXLAN List
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      OSPF Network Advertisement
                    </th>
                    <th scope="col" className="relative px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {FABRIC.dataNodes.length > 0 ? (
                    FABRIC?.dataNodes?.map((item, index) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <ServerIcon className="h-8 w-8 text-warmGray-700" />
                            </div>
                            <div className="ml-4">
                              <div className="text-base font-medium text-gray-900">
                                {item.routerName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {item.management}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-700">
                            {item.tunnel}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          <button
                            onClick={() => handlerViewVxlanById(item)}
                            className="flex gap-1 items-center text-blue-600 hover:text-blue-900 font-medium border-b border-blue-600 hover:border-blue-900 pb-1">
                            <ViewGridAddIcon className="h-4 w-4 " />
                            View VXLAN
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          <button
                            onClick={() =>
                              handlerDetailDataOSPFOrVXLAN(6, 'OSPF')
                            }
                            className="flex gap-1 items-center text-blue-600 hover:text-blue-900 font-medium border-b border-blue-600 hover:border-blue-900 pb-1">
                            <ViewGridAddIcon className="h-4 w-4 " />
                            View OSPF
                          </button>
                        </td>
                        <td className="px-6  py-4 whitespace-nowrap text-left text-sm font-medium gap-1">
                          <div className="flex justify-center items-center">
                            <button
                              onClick={() => handlerDelete(item)}
                              className="flex gap-1 items-center text-red-600 hover:text-red-900 font-medium">
                              <TrashIcon className="h-4 w-4 " />
                              Delete Node
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        rowSpan={6}
                        className="text-center text-gray-500 font-semibold py-4 px-6">
                        <span className="flex gap-2 w-full items-center justify-center">
                          {FABRIC.message === 'loading' && (
                            <LoadingIcon color="text-apps-primary ml-2" />
                          )}
                          Data Kosong
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
