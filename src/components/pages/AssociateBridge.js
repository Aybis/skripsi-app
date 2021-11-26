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
import { useHistory, useParams } from 'react-router';
import swal from 'sweetalert';
import vmat from '../../config/api/vmat';
import { setTokenHeader } from '../../config/axios';
import {
  fetchListBridgeDomain,
  fetchListNodeByBridgeDomain,
  statusData,
} from '../../store/actions/vxlan';
import FormAddInterface from '../atoms/FormAddInterface';
import FormAssociatedNode from '../atoms/FormAssociatedNode';
import LoadingIcon from '../atoms/LoadingIcon';
import ModalWithClose from '../atoms/ModalWithClose';
import RadioInterface from '../atoms/RadioInterface';
import Content from '../includes/Content';
import Layout from '../includes/Layout';

export default function AssociateBridge() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const BRIDGE = useSelector((state) => state.bridge);
  const FABRIC = useSelector((state) => state.fabric);

  const [bridgeDomain, setbridgeDomain] = useState('');
  const [dataBridgeAndRouter, setdataBridgeAndRouter] = useState('');
  const [dataInterface, setdataInterface] = useState([]);
  const [modalAssociateNode, setmodalAssociateNode] = useState(false);
  const [modalAssociateInterface, setmodalAssociateInterface] = useState(false);
  const [modalDeassociateInterface, setmodalDeassociateInterface] =
    useState(false);

  const handlerAssociateInterfaceToBridge = (data) => {
    let result =
      FABRIC.dataNodes.length > 0 &&
      FABRIC.dataNodes.filter((index) => index._id === data.idRouterListModel);

    setdataInterface(result[0]);
    setmodalAssociateInterface(true);
    setdataBridgeAndRouter(data);
  };

  const handlerDeassociateNode = (item) => {
    swal({
      title: 'Are you sure?',
      text: `Once deleted, you will not be able to recover this ${item.routerName}!`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Poof! Your Bridge Domain has been deleted!', {
          icon: 'success',
        });
      } else {
        swal('Your Bridge Domain is safe!');
      }
    });
  };

  useEffect(() => {
    dispatch(statusData('idle'));
    setTokenHeader();

    vmat
      .listNodeByBridgeDomain(id)
      .then((res) => {
        dispatch(fetchListNodeByBridgeDomain(res.data.message));
      })
      .catch((err) => {
        dispatch(statusData('error'));
      });

    vmat
      .getListBridgeDomain()
      .then((response) => {
        dispatch(fetchListBridgeDomain(response.data.message));
        let name = response.data.message.filter((index) => index._id === id);
        setbridgeDomain(name[0]);
      })
      .catch((err) => {
        dispatch(statusData('error'));
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout>
      <Content title={`Associated Node ${bridgeDomain.bdName ?? ''}`}>
        {/* Modal Associate Node */}
        <ModalWithClose
          show={modalAssociateNode}
          handlerModal={() => setmodalAssociateNode(false)}
          title="Associated Node">
          <FormAssociatedNode data={bridgeDomain} />
        </ModalWithClose>
        {/* End Modal Associate Node */}

        {/* Modal Associate Interface */}
        <ModalWithClose
          show={modalAssociateInterface}
          handlerModal={() => setmodalAssociateInterface(false)}
          title="Associated Interface to Node">
          <FormAddInterface
            data={dataBridgeAndRouter}
            idBridge={id}
            interfaceList={dataInterface}
          />
        </ModalWithClose>
        {/* End Modal Associate interface */}

        {/* Modal Deassociate Interface */}
        <ModalWithClose
          show={modalDeassociateInterface}
          handlerModal={() => setmodalDeassociateInterface(false)}
          title="Deassociated Interface">
          <RadioInterface />
        </ModalWithClose>
        {/* Modal Deassociate Interface */}

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
                  onClick={() => setmodalAssociateNode(true)}
                  className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-center justify-center gap-2 px-6 py-3 bg-apps-primary hover:bg-blue-600 focus:outline-none rounded">
                  <PlusSmIcon className="h-5 w-5 text-white" />
                  <p className="text-sm font-medium leading-none text-white">
                    Add Associate Node
                  </p>
                </button>
              </div>
            </div>
          </div>
          {/* Start Table */}
          <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-x-auto">
            {BRIDGE.status === 'idle' ? (
              <div className="flex justify-center items-center">
                <LoadingIcon color="text-apps-primary" height={8} width={8} />
              </div>
            ) : (
              <table className="w-full whitespace-nowrap">
                <thead className="bg-warmGray-50">
                  <tr className="h-16 w-full text-sm leading-none text-gray-500 uppercase">
                    <th className="font-semibold tracking-wide text-left pl-4">
                      No
                    </th>
                    <th className="font-semibold tracking-wide text-left pl-12">
                      Associated Node
                    </th>
                    <th className="font-semibold tracking-wide text-left pl-12">
                      Interface
                    </th>
                    <th className="font-semibold tracking-wide text-left pl-20"></th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {BRIDGE.dataNodeByBridgeDomain.length > 0 ? (
                    BRIDGE.dataNodeByBridgeDomain.map((item, index) => (
                      <tr
                        key={Math.random()}
                        className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                        <td className="pl-4">
                          <p className="text-sm font-medium leading-none text-gray-800">
                            {index + 1}
                          </p>
                        </td>
                        <td className="pl-4 cursor-pointer">
                          <div className="flex items-center">
                            <div className="w-10 h-10">
                              <ServerIcon className="text-blue-600 h-8 w-8" />
                            </div>
                            <div className="pl-4">
                              <p className="font-semibold text-blue-600 tracking-wide">
                                {item.routerName}
                              </p>
                              <p className="text-xs leading-3 text-blue-400 pt-2">
                                {item.bdName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="pl-12">
                          <p className="text-sm font-medium leading-none text-gray-800">
                            {item.interfaceMember.length > 0
                              ? item.interfaceMember.map((item) => `${item},  `)
                              : 'Belum ada interface'}
                          </p>
                        </td>
                        <td className="px-7 2xl:px-0 flex flex-col gap-3 py-2">
                          <button
                            onClick={() => handlerDeassociateNode(item)}
                            className="flex gap-1 items-center text-red-600 hover:text-red-900 font-medium">
                            <TrashIcon className="h-4 w-4 " />
                            Node
                          </button>

                          <button
                            onClick={() =>
                              handlerAssociateInterfaceToBridge(item)
                            }
                            className="flex gap-1 items-center text-green-600 hover:text-green-700 font-medium">
                            <PlusIcon className="h-4 w-4 " />
                            Interface
                          </button>
                          <button
                            onClick={() => setmodalDeassociateInterface(true)}
                            className="flex gap-1 items-center text-red-600 hover:text-red-700 font-medium">
                            <MinusIcon className="h-4 w-4 " />
                            Interface
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-2 px-4">
                        Data Kosong
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          {/* End Table */}
        </div>
      </Content>
    </Layout>
  );
}
