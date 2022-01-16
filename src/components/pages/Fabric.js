import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import vmat from '../../config/api/vmat';
import { setTokenHeader } from '../../config/axios';
import {
  checkUnderlay,
  fetchListBridge,
  fetchListNodes,
  fetchNode,
  messageData,
  setTunnel,
} from '../../store/actions/fabric';
import { FormAddFabric, FormDeployTunnel, Modals } from '../atoms';
import LoadingIcon from '../atoms/LoadingIcon';
import ModalDelete from '../atoms/ModalDelete';
import Table from '../atoms/Table';
import Content from '../includes/Content';
import Layout from '../includes/Layout';
import { TableBridge } from '../molecules';

export default function Fabric() {
  const FABRIC = useSelector((state) => state.fabric);
  const dispatch = useDispatch();

  const [show, setshow] = useState(false);
  const [modalListBridge, setmodalListBridge] = useState(false);
  const [modalListIbgp, setmodalListIbgp] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [loadingDelete, setloadingDelete] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [dataDelete, setdataDelete] = useState({
    id: '',
    name: '',
  });

  const [modalAddFabric, setmodalAddFabric] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [form, setform] = useState({
    ipAddressUnderlay: '',
  });

  const handlerOnChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handlerSetNewTunnel = (event) => {
    event.preventDefault();
    setisLoading(true);
    setTokenHeader();

    vmat
      .setUnderlay(form)
      .then((response) => {
        setisLoading(false);
        dispatch(setTunnel(true));
        setshow(false);
        swal({
          title: response.data.message,
          icon: 'success',
        });
      })
      .catch((err) => {
        setisLoading(false);
        swal({
          title: 'Something happenned',
          text: err.response.data.message ?? 'Something happenned',
          icon: 'error',
        });
      });
  };

  const handlerDeleteNode = (data) => {
    setTokenHeader();
    setloadingDelete(true);
    vmat
      .deleteNodes({ id: data.id })
      .then((response) => {
        setloadingDelete(false);
        swal({
          title: response.data.message ?? 'Delete Successfully',
          icon: 'success',
        });
        // ToastHandler('success', response.data.message);
        dispatch(
          fetchListNodes(
            FABRIC.dataNodes.filter((index) => index._id !== data.id),
          ),
        );
        setshowModalDelete(false);
      })
      .catch((err) => {
        setloadingDelete(false);
        swal({
          title: err?.response?.data?.message ?? 'Delete Successfully',
          icon: 'error',
        });
      });
  };

  const handlerModalDelete = (data) => {
    setshowModalDelete(true);
    setdataDelete({
      id: data._id,
      name: data.routerName,
    });
  };

  const handlerGetListVxlanById = (data) => {
    setmodalListBridge(true);
    dispatch(fetchListBridge(data));
  };

  const handlerAddFabric = () => {
    setmodalAddFabric(true);
    // settitleModalAdd('Associate Node to Fabric');
  };

  useEffect(() => {
    setTokenHeader();
    dispatch(messageData('loading'));
    dispatch(checkUnderlay());
    dispatch(fetchNode());

    setDidMount(true);
    return () => {
      setDidMount(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!didMount) {
    return null;
  }

  return (
    <Layout>
      <Content title="Fabric">
        {/* Modal Deploy  */}

        <FormDeployTunnel
          show={show}
          title={'Deploy Tunnel'}
          handlerOnChange={handlerOnChange}
          handlerShow={setshow}
          handlerSubmit={handlerSetNewTunnel}
          isSubmit={isLoading}
        />

        {/* Modal Add Fabric  */}
        <FormAddFabric
          show={modalAddFabric}
          handlerShow={setmodalAddFabric}
          title={'Add Fabric'}
        />

        {/* Modal view Data Bridge */}
        <Modals
          title={FABRIC.nameBridge}
          handlerShow={setmodalListBridge}
          show={modalListBridge}>
          <TableBridge />
        </Modals>

        <Modals
          title={FABRIC.nameBridge}
          handlerShow={setmodalListIbgp}
          show={modalListIbgp}>
          <TableBridge />
        </Modals>

        <ModalDelete
          isShow={showModalDelete}
          handlerClose={setshowModalDelete}
          data={dataDelete}
          isSubmit={loadingDelete}
          handlerDelete={handlerDeleteNode}
        />

        <div className="w-full mt-8">
          <div className="w-full flex justify-between items-center mb-10">
            <h2 className="text-xl font-semibold text-gray-900">
              List Manage Fabric
            </h2>
            {FABRIC.message === 'ok' && !FABRIC.tunnel ? (
              <button
                onClick={() => setshow(true)}
                disabled={FABRIC.tunnel}
                className={`bg-apps-primary flex gap-2 rounded-md px-4 py-2 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out font-medium disabled:opacity-50 `}>
                Deploy Tunnel
              </button>
            ) : (
              ''
            )}
          </div>

          {FABRIC.tunnel ? (
            <Table
              handlerOpenModal={() => handlerAddFabric()}
              handlerViewVxlanById={handlerGetListVxlanById}
              handlerDelete={handlerModalDelete}
            />
          ) : FABRIC.message === 'loading' ? (
            <div className="flex justify-center items-center px-4 py-2">
              <LoadingIcon color="text-apps-primary" height={8} width={8} />
            </div>
          ) : (
            <div className="flex justify-center items-center px-4 py-2">
              <p className="text-xl font-medium text-warmGray-500">
                Silahkan Buat Tunnel terlebih dahulu!
              </p>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
}
