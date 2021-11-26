import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import vmat from '../../config/api/vmat';
import { setTokenHeader } from '../../config/axios';
import { fetchListBridgeDomain, statusData } from '../../store/actions/vxlan';
import ChildTable from '../atoms/ChildTable';
import FormAddBridgeDomain from '../atoms/FormAddBridgeDomain';
import FormAssociatedNode from '../atoms/FormAssociatedNode';
import ModalWithClose from '../atoms/ModalWithClose';
import TableOspf from '../atoms/TableOspf';
import Content from '../includes/Content';
import Layout from '../includes/Layout';

export default function Vxlan({ history }) {
  const [showModal, setshowModal] = useState(false);
  const [showModalDetail, setshowModalDetail] = useState(false);
  const [titleModal, settitleModal] = useState('');
  const [data, setdata] = useState([]);
  const [modalAssociateNode, setmodalAssociateNode] = useState(false);
  const [dataBridgeDomain, setdataBridgeDomain] = useState({});
  const dispatch = useDispatch();

  const handlerAddBridgeDomain = () => {
    setshowModal(true);
    settitleModal('Add Bridge Domain');
  };

  const handlerModalAssociateNode = (data) => {
    setmodalAssociateNode(true);
    setdataBridgeDomain(data);
  };

  useEffect(() => {
    dispatch(statusData('idle'));

    setTokenHeader();

    vmat
      .getListBridgeDomain()
      .then((response) => {
        setdata(response.data.message);
        dispatch(fetchListBridgeDomain(response.data.message));
      })
      .catch((err) => {
        dispatch(statusData('error'));
      });
  }, [dispatch]);

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
          handlerOpenModal={() => handlerAddBridgeDomain()}
          handlerAssociateNode={handlerModalAssociateNode}
        />
      </Content>
    </Layout>
  );
}
