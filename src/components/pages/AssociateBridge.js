import { PlusSmIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import {
  deAssociatedNode,
  fetchListInterfaceNode,
  fetchListNodeByBridgeDomain,
  setListSelectNodeByBridge,
} from '../../store/actions/bridge';
import { Button, FormAddInterface, FormAssociatedNode, Modals } from '../atoms';
import ModalDelete from '../atoms/ModalDelete';
import Content from '../includes/Content';
import Layout from '../includes/Layout';
import {
  FormDeleteInterface,
  SectionBackMenu,
  SectionTableAssociateBridge,
} from '../molecules';

export default function AssociateBridge() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const BRIDGE = useSelector((state) => state.bridge);
  const [isSubmit, setisSubmit] = useState(false);
  const [showAssociatedNode, setshowAssociatedNode] = useState(false);
  const [showModalInterface, setShowModalInterface] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [selectData, setSelectData] = useState({});

  const handlerShowModalForm = (event, data) => {
    let nameType = event.target.name;

    setSelectData({
      idBridgeDomain: id,
      idRouter: data.idRouterListModel,
      name: data.routerName,
      type: event.target.name,
      interfaceMember: data.interfaceMember,
    });

    if (nameType === 'addInterface') {
      setShowModalInterface(true);
      dispatch(setListSelectNodeByBridge(data));
      dispatch(fetchListInterfaceNode(data.idRouterListModel));
    } else if (nameType === 'deleteInterface') {
      setShowModalInterface(true);
    } else if (nameType === 'deleteNode') {
      setshowDelete(true);
    } else {
      return;
    }
  };

  const handlerDeleteNode = async (data) => {
    setisSubmit(true);
    try {
      const result = await dispatch(
        deAssociatedNode({
          idBridgeDomain: data.idBridgeDomain,
          idRouter: data.idRouter,
        }),
      );
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
    dispatch(fetchListNodeByBridgeDomain(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout>
      <Content title={`Associated Node ${BRIDGE.selectBridge.bdName ?? ''}`}>
        <SectionBackMenu />

        <div className="mt-8 bg-white p-4 rounded-md">
          <div className="relative mb-4">
            <Button
              type={'primary'}
              handlerClick={() => setshowAssociatedNode(true)}>
              <PlusSmIcon className="h-5 w-5 text-white" />
              Add New Associate Node
            </Button>
          </div>
          {/* Start Table */}
          <SectionTableAssociateBridge
            handlerShowModalForm={handlerShowModalForm}
          />

          {/* End Table */}
        </div>
      </Content>

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

      {/* Modal Associate And Deassociate Interface */}
      <Modals
        show={showModalInterface}
        handlerShow={setShowModalInterface}
        title={`${
          selectData.type === 'addInterface' ? 'Associated' : 'Deassociated'
        } Interface with Bridge ${BRIDGE.selectBridge.bdName}`}
        isLoading={isSubmit}>
        {selectData.type === 'addInterface' ? (
          <FormAddInterface
            handlerModal={setShowModalInterface}
            loading={isSubmit}
            setLoading={setisSubmit}
          />
        ) : (
          <FormDeleteInterface
            handlerModal={setShowModalInterface}
            loading={isSubmit}
            data={selectData}
            setLoading={setisSubmit}
          />
        )}
      </Modals>

      {/* Modal Deassociate  Node */}
      <ModalDelete
        isShow={showDelete}
        handlerClose={setshowDelete}
        data={selectData}
        isSubmit={isSubmit}
        handlerDelete={handlerDeleteNode}
      />
    </Layout>
  );
}
