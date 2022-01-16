import { PlusSmIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTokenHeader } from '../../config/axios';
import {
  fetchListBridgeDomain,
  setName,
  statusData,
} from '../../store/actions/bridge';
import {
  ChildTable,
  FormAddBridgeDomain,
  FormAssociatedNode,
  Modals,
} from '../atoms';
import { Content, Layout } from '../includes';
import { ListTableBridgeDomain } from '../molecules';

export default function Vxlan({ history }) {
  const BRIDGE = useSelector((state) => state.bridge);
  const [showModal, setshowModal] = useState(false);
  const [showModalDetail, setshowModalDetail] = useState(false);
  const [modalAssociateNode, setmodalAssociateNode] = useState(false);
  const dispatch = useDispatch();

  const handlerModalAssociateNode = (data) => {
    setmodalAssociateNode(true);
    dispatch(setName(data));
  };

  useEffect(() => {
    dispatch(statusData('idle'));
    dispatch(fetchListBridgeDomain());
    setTokenHeader();
  }, [dispatch]);

  return (
    <Layout>
      <Content title="BRIDGE DOMAIN">
        {/* Modal Add Bridge */}
        <FormAddBridgeDomain show={showModal} handlerShow={setshowModal} />

        {/* Modal Associate Node */}
        <FormAssociatedNode
          show={modalAssociateNode}
          handlerShow={setmodalAssociateNode}
        />

        {/* Modal Detail List Bridge */}
        <Modals
          show={showModalDetail}
          handlerShow={setshowModalDetail}
          title={BRIDGE.name.bdNname}>
          <ChildTable data={BRIDGE.name} />
        </Modals>

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
            handlerModalAssociateNode={handlerModalAssociateNode}
          />
        </div>
      </Content>
    </Layout>
  );
}
