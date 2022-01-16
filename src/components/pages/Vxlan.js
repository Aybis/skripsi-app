import { PlusSmIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import {
  deleteBridge,
  fetchListBridgeDomain,
  setSelectBridge,
} from '../../store/actions/bridge';
import { FormAddBridgeDomain, FormAssociatedNode, Modals } from '../atoms';
import ModalDelete from '../atoms/ModalDelete';
import { Content, Layout } from '../includes';
import { ListTableBridgeDomain } from '../molecules';

export default function Vxlan({ history }) {
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

        {/* List Table  */}
        <div className="mt-8">
          <div className="relative mb-6">
            <button
              onClick={() => setshowModal(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-apps-primary hover:bg-blue-600 focus:outline-none rounded">
              <PlusSmIcon className="h-5 w-5 text-white" />
              <p className="text-sm font-medium leading-none text-white">
                Add Bridge Domain
              </p>
            </button>
          </div>
          <ListTableBridgeDomain
            handlerDelete={handlerModalDelete}
            handlerModalAssociateNode={handlerModalAssociateNode}
          />
        </div>
      </Content>

      <ModalDelete
        isShow={showDelete}
        handlerClose={setshowDelete}
        data={dataDelete}
        isSubmit={isSubmit}
        handlerDelete={handlerDelete}
      />
    </Layout>
  );
}
