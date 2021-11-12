import { PlusSmIcon, ServerIcon, TrashIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import ModalDelete from '../atoms/ModalDelete';
import ModalWithClose from '../atoms/ModalWithClose';
import Content from '../includes/Content';
import Layout from '../includes/Layout';

export default function Ospf() {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [modalAssociateNode, setmodalAssociateNode] = useState(false);
  const node = [
    {
      name: 'JKT_SPOKE',
      interface: 'eth1',
      ip: '10.20.20.1/24',
      block: '10.20.20.0/24',
    },
    {
      name: 'SMG_SPOKE',
      interface: 'eth2',
      ip: '10.20.30.1/24',
      block: '10.20.30.0/24',
    },
    {
      name: 'SBY_SPOKE',
      interface: 'eth3',
      ip: '10.20.40.1/24',
      block: '10.20.40.0/24',
    },
    {
      name: 'AZURE_SPOKE',
      interface: 'eth4',
      ip: '10.20.50.1/24',
      block: '10.20.50.0/24',
    },
  ];

  const handlerSubmit = (event) => {
    event.preventDefault();
  };

  let dataDelete = {
    name: '10.20.20.0/24',
  };

  return (
    <Layout>
      <Content title="ibgp">
        {/* Modal add block */}
        <ModalWithClose
          show={modalAssociateNode}
          handlerModal={() => setmodalAssociateNode(false)}
          title="Add Block IP Address">
          <form onSubmit={handlerSubmit} className="mt-4">
            <div className="flex gap-4 sm:gap-4 sm:items-start mt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 w-36">
                IP Address
              </label>
              <div className="mt-1 sm:mt-0 w-full">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="bridge_domain"
                    placeholder="10.20.50.1/24"
                    className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 placeholder-gray-300 rounded-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-4 sm:items-start mt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 w-36">
                Subnet Address
              </label>
              <div className="mt-1 sm:mt-0 w-full">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="bridge_domain"
                    placeholder="10.20.50.0/24"
                    className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 placeholder-gray-300 rounded-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-4 sm:items-start mt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 w-36">
                Node
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
                className="block text-sm font-medium text-gray-700 w-36">
                Interface
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
              <span className="block text-sm font-medium text-gray-700 w-36"></span>
              <div className="mt-1 sm:mt-0 w-full">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Add Block IP Address
                </button>
              </div>
            </div>
          </form>
        </ModalWithClose>
        {/* End Modal block ip */}

        {/* Modal Delete block ip */}
        <ModalDelete
          isShow={showModalDelete}
          handlerClose={() => setshowModalDelete(false)}
          data={dataDelete}
          isSubmit={false}
        />
        {/* End Modal Delete block ip */}

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
                    Add Block IP Address
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
                    IP Address
                  </th>
                  <th className="font-semibold tracking-wide text-left pl-12">
                    Block / Subnet IP Address
                  </th>
                  <th className="font-semibold tracking-wide text-left pl-12">
                    Node
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
                          <ServerIcon className="text-gray-800 h-8 w-8" />
                        </div>
                        <div className="pl-2">
                          <p className="font-semibold text-gray-800 tracking-wide">
                            {item.ip}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {item.block}
                      </p>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {item.name}
                      </p>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {item.interface}
                      </p>
                    </td>
                    <td className="pl-12">
                      <div className="flex">
                        <button
                          onClick={() => setshowModalDelete(true)}
                          className="flex gap-1 items-center text-red-600 hover:text-red-900 font-medium">
                          <TrashIcon className="h-4 w-4 " />
                          Delete
                        </button>
                      </div>
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
