import { useState } from 'react';
import ChildTableFabric from '../atoms/ChildTableFabric';
import Modal from '../atoms/Modal';
import ModalWithClose from '../atoms/ModalWithClose';
import Table from '../atoms/Table';
import Content from '../includes/Content';
import Layout from '../includes/Layout';

export default function Fabric() {
  const [show, setshow] = useState(true);
  const [modalAddOspfOrVlan, setmodalAddOspfOrVlan] = useState(false);
  const [titleModalAdd, settitleModalAdd] = useState('');
  const [modalAddFabric, setmodalAddFabric] = useState(false);
  const [showModalDetailData, setshowModalDetailData] = useState(false);
  const [getListDetailData, setgetListDetailData] = useState(0);

  const handlerAddFabric = () => {
    setmodalAddFabric(true);
    settitleModalAdd('Add Node to Fabric');
  };

  const handlerAddOSPFandVlan = (item, name) => {
    setmodalAddOspfOrVlan(true);
    settitleModalAdd(name);
  };

  const handlerDetailDataOSPFOrVXLAN = (item, name) => {
    settitleModalAdd(name);
    setgetListDetailData(item);
    setshowModalDetailData(true);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    setmodalAddFabric(false);
  };

  return (
    <Layout>
      <Content title="Fabric">
        {/* Modal Deploy  */}
        <Modal show={show} handlerShow={() => setshow(false)} />

        {/* Modal Add Fabric  */}
        <ModalWithClose
          show={modalAddFabric}
          handlerModal={() => setmodalAddFabric(false)}
          title={titleModalAdd}>
          <form onSubmit={handlerSubmit} className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 sm:gap-4 sm:items-start">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 w-24">
                  Node
                </label>
                <div className="mt-1 sm:mt-0 w-full">
                  <input
                    type="text"
                    name="bridge_domain"
                    id="bridge"
                    className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:gap-4 sm:items-start">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 w-24">
                  Tunnel
                </label>
                <div className="mt-1 sm:mt-0 w-full">
                  <input
                    type="text"
                    name="bridge_domain"
                    id="bridge"
                    className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Add Fabric
            </button>
          </form>
        </ModalWithClose>

        {/* Modal Add OSPF or VXLAN */}
        <ModalWithClose
          show={modalAddOspfOrVlan}
          handlerModal={() => setmodalAddOspfOrVlan(false)}
          title={`Add ${titleModalAdd}`}>
          <form onSubmit={handlerSubmit} className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 sm:gap-4 sm:items-start">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 w-24">
                  Subnet
                </label>
                <div className="mt-1 sm:mt-0 w-full">
                  <input
                    type="text"
                    name="bridge_domain"
                    id="bridge"
                    className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:gap-4 sm:items-start">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 w-24">
                  Description
                </label>
                <div className="mt-1 sm:mt-0 w-full">
                  <input
                    type="text"
                    name="bridge_domain"
                    id="bridge"
                    className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Add {titleModalAdd}
            </button>
          </form>
        </ModalWithClose>

        {/* Modal List Data OSPF or VXLAN */}
        <ModalWithClose
          show={showModalDetailData}
          handlerModal={() => setshowModalDetailData(false)}
          title={`List ${titleModalAdd}`}>
          <ChildTableFabric data={getListDetailData} name={titleModalAdd} />
        </ModalWithClose>

        <div className="w-full mt-8">
          <div className="w-full text-left mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              List Manage Fabric
            </h2>
          </div>
          <Table
            handlerOpenModal={() => handlerAddFabric()}
            handlerAddOSPFandVlan={handlerAddOSPFandVlan}
            handlerDetailDataOSPFOrVXLAN={handlerDetailDataOSPFOrVXLAN}
          />
        </div>
      </Content>
    </Layout>
  );
}
