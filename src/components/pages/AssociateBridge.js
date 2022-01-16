import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  PlusSmIcon,
  ServerIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import {
  deAssociatedNode,
  fetchListInterfaceNode,
  fetchListNodeByBridgeDomain,
  setListSelectNodeByBridge,
} from '../../store/actions/bridge';
import {
  FormAddInterface,
  FormAssociatedNode,
  LoadingIcon,
  Modals,
  TableBody,
  TableContent,
  TableHeading,
} from '../atoms';
import ModalDelete from '../atoms/ModalDelete';
import Content from '../includes/Content';
import Layout from '../includes/Layout';

export default function AssociateBridge() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const BRIDGE = useSelector((state) => state.bridge);
  const [isSubmit, setisSubmit] = useState(false);
  const [showAssociatedNode, setshowAssociatedNode] = useState(false);
  const [showAssociateInterface, setshowAssociateInterface] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [dataDelete, setdataDelete] = useState({
    id: '',
    name: '',
  });
  console.log(BRIDGE);

  const handlerAddInterfaceBridge = (data) => {
    setshowAssociateInterface(true);
    dispatch(setListSelectNodeByBridge(data));
    dispatch(fetchListInterfaceNode(data.idRouterListModel));
  };

  const handlerModalDelete = (data) => {
    setshowDelete(true);
    setdataDelete({
      idBridgeDomain: id,
      idRouter: data.idRouterListModel,
      name: data.routerName,
    });
  };

  const handlerDelete = async (data) => {
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
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={history.goBack}
          className="z-10 cursor-pointer inline-flex gap-1 justify-center items-center text-gray-600 transition-all duration-300  group hover:text-gray-800">
          <ArrowLeftIcon className="h-10 t p-2 bg-white rounded-md" />
          <p className="text- font-semibold">Kembali</p>
        </motion.div>

        <div className="mt-8">
          <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <div className="sm:flex items-center justify-between">
              <div className="flex gap-4 justify-center items-center">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                  List Data
                </p>
              </div>

              <div>
                <button
                  onClick={() => setshowAssociatedNode(true)}
                  className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-center justify-center gap-2 px-6 py-3 bg-apps-primary hover:bg-blue-600 focus:outline-none rounded">
                  <PlusSmIcon className="h-5 w-5 text-white" />
                  <p className="text-sm font-medium leading-none text-white">
                    Add New Associate Node
                  </p>
                </button>
              </div>
            </div>
          </div>
          {/* Start Table */}

          <TableHeading
            theading={['No', 'Associated Node', 'Interface', 'Action']}>
            {BRIDGE.loading ? (
              <TableBody>
                <TableContent colSpan={4} rowSpan={4}>
                  <div className="flex justify-center items-center">
                    <LoadingIcon
                      color="text-apps-primary"
                      height={8}
                      width={8}
                    />
                  </div>
                </TableContent>
              </TableBody>
            ) : BRIDGE.listNodeByBridge.length > 0 ? (
              BRIDGE.listNodeByBridge.map((item, index) => (
                <TableBody key={Math.random()}>
                  <TableContent>{index + 1}</TableContent>
                  <TableContent>
                    <div className="flex items-center">
                      <div className="w-10 h-10">
                        <ServerIcon className="text-gray-500 h-8 w-8" />
                      </div>
                      <div className="pl-4">
                        <p className="font-semibold text-gray-800 tracking-wide">
                          {item.routerName}
                        </p>
                        <p className="text-xs leading-3 text-gray-400 pt-2">
                          {item.bdName}
                        </p>
                      </div>
                    </div>
                  </TableContent>
                  <TableContent>
                    <p className="text-sm font-medium leading-none text-gray-800 text-center">
                      {item.interfaceMember.length > 0
                        ? item.interfaceMember.map((item) => `${item},  `)
                        : 'Belum ada interface'}
                    </p>
                  </TableContent>
                  <TableContent>
                    <div className="flex flex-col gap-2 p-4">
                      <button
                        onClick={() => handlerModalDelete(item)}
                        className="flex gap-1 items-center text-red-600 hover:text-red-900 font-medium">
                        <TrashIcon className="h-4 w-4 " />
                        Deassociate Node
                      </button>

                      <button
                        onClick={() => handlerAddInterfaceBridge(item)}
                        className="flex gap-1 items-center text-green-600 hover:text-green-700 font-medium">
                        <PlusIcon className="h-4 w-4 " />
                        Add Interface
                      </button>
                      <button className="flex gap-1 items-center text-red-600 hover:text-red-700 font-medium">
                        <MinusIcon className="h-4 w-4 " />
                        Interface
                      </button>
                    </div>
                  </TableContent>
                </TableBody>
              ))
            ) : (
              <TableBody>
                <TableContent colSpan={4} rowSpan={4}>
                  <div className="flex justify-center items-center">
                    <p>Belum Ada Node</p>
                  </div>
                </TableContent>
              </TableBody>
            )}
          </TableHeading>

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

      {/* Modal Associate Node */}
      <Modals
        show={showAssociateInterface}
        handlerShow={setshowAssociateInterface}
        title={`Associated Interface with Bridge ${BRIDGE.selectBridge.bdName}`}
        isLoading={isSubmit}>
        <FormAddInterface
          handlerModal={setshowAssociateInterface}
          loading={isSubmit}
          setLoading={setisSubmit}
        />
      </Modals>

      {/* Modal Deassociate  Node */}
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
