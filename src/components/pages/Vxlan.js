import { useEffect, useState } from 'react';
import vmat from '../../config/api/vmat';
import { setTokenHeader } from '../../config/axios';
import ChildTable from '../atoms/ChildTable';
import FormAddBridgeDomain from '../atoms/FormAddBridgeDomain';
import FormAssociatedNode from '../atoms/FormAssociatedNode';
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
  const [dataBridgeDomain, setdataBridgeDomain] = useState({});

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

    // setdata(item);
  };

  const handlerModalAssociateNode = (data) => {
    setmodalAssociateNode(true);
    setdataBridgeDomain(data);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
  };

  let dataDelete = {
    name: 'BD_BILLING',
  };

  useEffect(() => {
    setTokenHeader();

    vmat
      .getListBridgeDomain()
      .then((response) => {
        setdata(response.data.message);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <Layout>
      <Content title="BRIDGE DOMAIN">
        {/* Modal Add Bridge */}
        <ModalWithClose
          show={showModal}
          handlerModal={() => setshowModal(false)}
          title={titleModal}>
          <FormAddBridgeDomain />
        </ModalWithClose>

        {/* Modal Delete Bridge DOmain */}
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
          <FormAssociatedNode data={dataBridgeDomain} />
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
          data={data}
          handlerOpenModal={() => handlerAddBridgeDomain()}
          handlerClickData={handlerClickData}
          handlerClickDelete={() => setshowModalDelete(true)}
          handlerAssociateNode={handlerModalAssociateNode}
        />
      </Content>
    </Layout>
  );
}
