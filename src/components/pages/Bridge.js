import { PlusSmIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import {
  deleteBridge,
  fetchListBridgeDomain,
  setSelectBridge,
} from '../../store/actions/bridge';
import {
  Button,
  FormAddBridgeDomain,
  FormAssociatedNode,
  Modals,
} from '../atoms';
import ModalDelete from '../atoms/ModalDelete';
import { Content, Layout } from '../includes';
import { SectionTableBridge } from '../molecules';

export default function Bridge() {
  const BRIDGE = useSelector((state) => state.bridge);
  const [isSubmit, setisSubmit] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [showAssociatedNode, setshowAssociatedNode] = useState(false);
  const [showModalDetail, setshowModalDetail] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [dataDelete, setdataDelete] = useState({
    id: '',
    name: '',
  });
  const dispatch = useDispatch();

  const handlerModalAssociateNode = (data) => {
    setshowAssociatedNode(true);
    dispatch(setSelectBridge(data));
  };

  const handlerModalDelete = (data) => {
    setshowDelete(true);
    setdataDelete({
      id: data._id,
      name: data.bdName,
    });
  };

  const handlerDelete = async (data) => {
    setisSubmit(true);
    try {
      const result = await dispatch(deleteBridge({ idBridge: data.id }));
      setisSubmit(false);
      if (result.status === 200) {
        dispatch(fetchListBridgeDomain());

        swal('Yeay!', result.message, 'success');
        setshowDelete(false);
      } else {
        swal('Oh No!', result.message, 'error');
      }
    } catch (error) {
      swal('Oh No!', 'Something Happened!', 'error');
    }
    setisSubmit(false);
  };

  useEffect(() => {
    dispatch(fetchListBridgeDomain());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout>
      <Content title="BRIDGE DOMAIN">
        {/* List Table  */}
        <div className="relative bg-white p-4 rounded-md mt-6">
          <Button type={'primary'} handlerClick={() => setshowModal(true)}>
            <PlusSmIcon className="h-5 w-5 text-white" />
            Add Bridge Domain
          </Button>

          <div className="relative mt-4">
            <SectionTableBridge
              handlerDelete={handlerModalDelete}
              handlerModalAssociateNode={handlerModalAssociateNode}
            />
          </div>
        </div>
      </Content>

      {/* Modal Delete Bridge */}
      <ModalDelete
        isShow={showDelete}
        handlerClose={setshowDelete}
        data={dataDelete}
        isSubmit={isSubmit}
        handlerDelete={handlerDelete}
      />

      {/* Modal Add Bridge */}
      <Modals
        show={showModal}
        handlerShow={setshowModal}
        title={'Add Bridge Domain'}
        isLoading={isSubmit}>
        <FormAddBridgeDomain
          handlerModal={setshowModal}
          loading={isSubmit}
          setLoading={setisSubmit}
        />
      </Modals>

      {/* Modal Associate Node */}
      <Modals
        show={showAssociatedNode}
        handlerShow={setshowAssociatedNode}
        title={`Associated Node ${BRIDGE.selectBridge.bdName}`}
        isLoading={isSubmit}>
        <FormAssociatedNode
          handlerModal={setshowAssociatedNode}
          loading={isSubmit}
          setLoading={setisSubmit}
        />
      </Modals>

      {/* Modal Detail List Bridge */}
      <Modals
        show={showModalDetail}
        handlerShow={setshowModalDetail}
        title={BRIDGE.selectBridge.bdNname}>
        {/* <ChildTable data={BRIDGE.selectBridge} /> */}
      </Modals>
    </Layout>
  );
}
