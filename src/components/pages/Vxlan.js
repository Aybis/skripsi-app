import { useState } from 'react';
import ChildTable from '../atoms/ChildTable';
import ModalDelete from '../atoms/ModalDelete';
import ModalWithClose from '../atoms/ModalWithClose';
import TableOspf from '../atoms/TableOspf';
import Content from '../includes/Content';
import Layout from '../includes/Layout';

export default function Vxlan({ history }) {
  const [showModal, setshowModal] = useState(false);
  const [showModalDetail, setshowModalDetail] = useState(false);
  const [titleModal, settitleModal] = useState('');
  const [data, setdata] = useState([]);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [modalAssociateNode, setmodalAssociateNode] = useState(false);

  const bridge = [
    {
      name: 'BD_BILLING',
      aplikasi: 'Invoice',
      bridge_id: '10',
      vni: 18,
      data: 5,
    },
    {
      name: 'BD_OPERATION',
      aplikasi: 'Management Operation',
      bridge_id: '11',
      vni: 20,
      data: 4,
    },
    {
      name: 'BD_GENERAL_AFFAIR',
      aplikasi: 'Management Seat',
      bridge_id: '13',
      vni: 24,
      data: 3,
    },
    {
      name: 'BD_GENERAL_AFFAIR',
      aplikasi: 'Management Assets',
      bridge_id: '14',
      vni: 23,
      data: 7,
    },
    {
      name: 'BD_FINANCE',
      aplikasi: 'Reimburse',
      bridge_id: '15',
      vni: 22,
      data: 5,
    },
  ];

  const handlerAddBridgeDomain = () => {
    setshowModal(true);
    settitleModal('Add Bridge Domain');
  };

  const handlerClickData = (item) => {
    setshowModalDetail(true);
    history.push('/bridge/associate');

    setdata(item);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    setshowModal(false);
  };

  let dataDelete = {
    name: 'BD_BILLING',
  };

  return (
    <Layout>
      <Content title="BRIDGE DOMAIN">
        {/* Modal Add Bridge */}
        <ModalWithClose
          show={showModal}
          handlerModal={() => setshowModal(false)}
          title={titleModal}>
          <form onSubmit={handlerSubmit} className="mt-4">
            <div className="flex gap-4 sm:gap-4 sm:items-start">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 w-36">
                Bridge Name
              </label>
              <div className="mt-1 sm:mt-0 w-full">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    BD_
                  </span>
                  <input
                    type="text"
                    name="bridge_domain"
                    id="bridge"
                    placeholder="BILLING"
                    className="flex-1 block w-full placeholder-gray-300 focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-4 sm:items-start mt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 w-36">
                VNI ID
              </label>
              <div className="mt-1 sm:mt-0 w-full">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="number"
                    name="bridge_domain"
                    placeholder="10"
                    className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 placeholder-gray-300 rounded-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-4 sm:items-start mt-4">
              <span className="block text-sm font-medium text-gray-700 w-36"></span>
              <div className="mt-1 sm:mt-0 w-full">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Add Bridge Domain
                </button>
              </div>
            </div>
          </form>
        </ModalWithClose>

        <ModalDelete
          isShow={showModalDelete}
          handlerClose={() => setshowModalDelete(false)}
          data={dataDelete}
          isSubmit={false}
        />

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
                    <option selected disabled value="spoke">
                      BD_BILLING
                    </option>
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

        {/* Modal Detail List Bridge */}
        <ModalWithClose
          show={showModalDetail}
          handlerModal={() => setshowModalDetail(false)}
          title={data.name}>
          <ChildTable data={data.data} />
        </ModalWithClose>

        <TableOspf
          title="Data"
          data={bridge}
          handlerOpenModal={() => handlerAddBridgeDomain()}
          handlerClickData={handlerClickData}
          handlerClickDelete={() => setshowModalDelete(true)}
          handlerAssociateNode={() => setmodalAssociateNode(true)}
        />
      </Content>
    </Layout>
  );
}
