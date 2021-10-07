import { useState } from 'react';
import ChildTable from '../atoms/ChildTable';
import ModalWithClose from '../atoms/ModalWithClose';
import TableOspf from '../atoms/TableOspf';
import Content from '../includes/Content';

export default function Ospf() {
  const [showModal, setshowModal] = useState(false);
  const [showModalDetail, setshowModalDetail] = useState(false);
  const [titleModal, settitleModal] = useState('');
  const [data, setdata] = useState([]);

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
    setdata(item);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    setshowModal(false);
  };

  return (
    <Content>
      {/* Modal Add Bridge */}
      <ModalWithClose
        show={showModal}
        handlerModal={() => setshowModal(false)}
        title={titleModal}>
        <form onSubmit={handlerSubmit} className="mt-4">
          <div className="flex flex-col gap-4 sm:gap-4 sm:items-start">
            <label
              htmlFor="username"
              className="block text-sm text-left font-medium text-gray-700 sm:mt-px sm:pt-2">
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
                  className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Add Bridge
          </button>
        </form>
      </ModalWithClose>

      {/* Modal Detail List Bridge */}
      <ModalWithClose
        show={showModalDetail}
        handlerModal={() => setshowModalDetail(false)}
        title={data.name}>
        <ChildTable data={data.data} />
      </ModalWithClose>

      <TableOspf
        title="OSPF"
        data={bridge}
        handlerOpenModal={() => handlerAddBridgeDomain()}
        handlerClickData={handlerClickData}
      />
    </Content>
  );
}
