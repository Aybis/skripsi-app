import {
  MinusIcon,
  PlusIcon,
  PlusSmIcon,
  ServerIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import ModalDelete from '../atoms/ModalDelete';
import ModalWithClose from '../atoms/ModalWithClose';
import RadioInterface from '../atoms/RadioInterface';
import Content from '../includes/Content';
import Layout from '../includes/Layout';

export default function AssociateBridge() {
  const [modalAssociateInterface, setmodalAssociateInterface] = useState(false);
  const [modalDeassociateInterface, setmodalDeassociateInterface] =
    useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [modalAssociateNode, setmodalAssociateNode] = useState(false);

  const node = [
    {
      name: 'JKT_SPOKE',
      interface: ['eth0', 'eth2', 'eth3'],
      aplikasi: 'Invoice',
      bridge_id: '10',
      vni: 18,
      data: 5,
    },
    {
      name: 'SMG_SPOKE',
      interface: ['eth1', 'eth2'],
      aplikasi: 'Management Operation',
      bridge_id: '11',
      vni: 20,
      data: 4,
    },
    {
      name: 'SBY_SPOKE',
      interface: ['eth1'],
      aplikasi: 'Management Seat',
      bridge_id: '13',
      vni: 24,
      data: 3,
    },
    {
      name: 'AZURE_SPOKE',
      interface: ['eth0', 'eth1', 'eth2'],
      bridge_id: '14',
      vni: 23,
      data: 7,
    },
  ];

  const handlerSubmit = (event) => {
    event.preventDefault();
  };

  let dataDelete = {
    name: 'JKT_SPOKE',
  };

  return (
    <Layout>
      <Content title="Associated Node BD_BILLING">
        {/* Modal Associate Node */}
        <ModalWithClose
          show={modalAssociateNode}
          handlerModal={() => setmodalAssociateNode(false)}
          title="Associated Node">
          <form onSubmit={handlerSubmit} className="mt-4">
            <div className="flex gap-4 sm:gap-4 sm:items-start">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 w-44">
                Select Bridge Domain
              </label>
              <div className="mt-1 sm:mt-0 w-full">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <select
                    disabled
                    name="role"
                    defaultValue={''}
                    className="max-w-lg block bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                    <option value="spoke">BD_BILLING</option>
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
                Select Node
              </label>
              <div className="mt-1 sm:mt-0 w-full">
                <div className="max-w-lg flex rounded-md shadow-sm">
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
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <select
                    name="role"
                    defaultValue={''}
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                    <option disabled value="">
                      Pilih Interface
                    </option>
                    <option value="spoke">eth1</option>
                    <option value="hub">eth2</option>
                    <option value="spoke">SMG-SPOKE</option>
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
        </ModalWithClose>
        {/* End Modal Associate Node */}

        {/* Modal Delete Associate Node */}
        <ModalDelete
          isShow={showModalDelete}
          handlerClose={() => setshowModalDelete(false)}
          data={dataDelete}
          isSubmit={false}
        />
        {/* End Modal Delete Associate Node */}

        {/* Modal Associate Interface */}
        <ModalWithClose
          show={modalAssociateInterface}
          handlerModal={() => setmodalAssociateInterface(false)}
          title="Associated Interface to Node">
          <form onSubmit={handlerSubmit} className="mt-4">
            <div className="flex gap-4 sm:gap-4 sm:items-start">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 w-44">
                Select Bridge Domain
              </label>
              <div className="mt-1 sm:mt-0 w-full">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <select
                    disabled
                    name="role"
                    defaultValue={''}
                    className="max-w-lg block bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                    <option value="spoke">BD_BILLING</option>
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
                Select Node
              </label>
              <div className="mt-1 sm:mt-0 w-full">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <select
                    name="role"
                    defaultValue={''}
                    disabled
                    className="max-w-lg block bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
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
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <select
                    name="role"
                    defaultValue={''}
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                    <option disabled value="">
                      Pilih Interface
                    </option>
                    <option value="spoke">eth1</option>
                    <option value="hub">eth4</option>
                    <option value="spoke">eth5</option>
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
                  Associate Interface
                </button>
              </div>
            </div>
          </form>
        </ModalWithClose>
        {/* End Modal Associate interface */}

        {/* Modal Deassociate Interface */}
        <ModalWithClose
          show={modalDeassociateInterface}
          handlerModal={() => setmodalDeassociateInterface(false)}
          title="Deassociated Interface">
          <RadioInterface />
        </ModalWithClose>
        {/* Modal Deassociate Interface */}

        <div className="mt-8">
          <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <div className="sm:flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                List Data
              </p>
              <div>
                <button
                  onClick={() => setmodalAssociateNode(true)}
                  className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-center justify-center gap-2 px-6 py-3 bg-apps-primary hover:bg-blue-600 focus:outline-none rounded">
                  <PlusSmIcon className="h-5 w-5 text-white" />
                  <p className="text-sm font-medium leading-none text-white">
                    Add Associate Node
                  </p>
                </button>
              </div>
            </div>
          </div>
          {/* Start Table */}
          <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-warmGray-50">
                <tr className="h-16 w-full text-sm leading-none text-gray-500 uppercase">
                  <th className="font-semibold tracking-wide text-left pl-4">
                    No
                  </th>
                  <th className="font-semibold tracking-wide text-left pl-12">
                    Associated Node
                  </th>
                  <th className="font-semibold tracking-wide text-left pl-12">
                    Interface
                  </th>
                  <th className="font-semibold tracking-wide text-left pl-20"></th>
                </tr>
              </thead>
              <tbody className="w-full">
                {node.map((item, index) => (
                  <tr
                    key={Math.random()}
                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                    <td className="pl-4">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {index + 1}
                      </p>
                    </td>
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-10 h-10">
                          <ServerIcon className="text-blue-600 h-8 w-8" />
                        </div>
                        <div className="pl-4">
                          <p className="font-semibold text-blue-600 tracking-wide">
                            {item.name}
                          </p>
                          <p className="text-xs leading-3 text-blue-400 pt-2">
                            BD_BILLING
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {item.interface.map((item) => `${item},  `)}
                      </p>
                    </td>
                    <td className="px-7 2xl:px-0 flex flex-col gap-3 py-2">
                      <button
                        onClick={() => setshowModalDelete(true)}
                        className="flex gap-1 items-center text-red-600 hover:text-red-900 font-medium">
                        <TrashIcon className="h-4 w-4 " />
                        Node
                      </button>

                      <button
                        onClick={() => setmodalAssociateInterface(true)}
                        className="flex gap-1 items-center text-green-600 hover:text-green-700 font-medium">
                        <PlusIcon className="h-4 w-4 " />
                        Interface
                      </button>
                      <button
                        onClick={() => setmodalDeassociateInterface(true)}
                        className="flex gap-1 items-center text-red-600 hover:text-red-700 font-medium">
                        <MinusIcon className="h-4 w-4 " />
                        Interface
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* End Table */}
        </div>
      </Content>
    </Layout>
  );
}
