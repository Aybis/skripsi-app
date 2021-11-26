import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import vmat from '../../config/api/vmat';
import { setTokenHeader } from '../../config/axios';
import ToastHandler from '../../helpers/toast';
import {
  fetchListNodes,
  fetchVxlanByFabric,
  messageData,
} from '../../store/actions/fabric';
import ChildTableFabric from '../atoms/ChildTableFabric';
import FormAddFabric from '../atoms/FormAddFabric';
import LoadingIcon from '../atoms/LoadingIcon';
import Modal from '../atoms/Modal';
import ModalDelete from '../atoms/ModalDelete';
import ModalWithClose from '../atoms/ModalWithClose';
import Table from '../atoms/Table';
import Content from '../includes/Content';
import Layout from '../includes/Layout';

export default function Fabric() {
  const FABRIC = useSelector((state) => state.fabric);
  const [isUnderlayReady, setisUnderlayReady] = useState(false);
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const [showListVxlan, setshowListVxlan] = useState(false);
  const [titleModalVxlan, settitleModalVxlan] = useState('VXLAN');
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [loadingDelete, setloadingDelete] = useState(false);
  // untuk mematkan proses halaman sekarang ketika pindah halaman lain
  const [didMount, setDidMount] = useState(false);
  const [dataDelete, setdataDelete] = useState({
    id: '',
    name: '',
  });

  const [titleModalAdd, settitleModalAdd] = useState('');
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
        setisUnderlayReady(true);

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

  const handlerGetListNode = () => {
    setTokenHeader();

    vmat
      .getNodes()
      .then((response) => {
        dispatch(fetchListNodes(response.data.message));
        dispatch(messageData('ok'));
      })
      .catch((err) => {
        dispatch(messageData('error'));
        ToastHandler(
          'error',
          err.response.data.message ?? 'Something happenned',
        );
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
    setshowListVxlan(true);
    setTokenHeader();
    vmat
      .viewVxlanById(data._id)
      .then((response) => {
        dispatch(fetchVxlanByFabric(response.data.message));
        settitleModalVxlan(data.routerName);
      })
      .catch((err) => {
        ToastHandler('err', err?.response?.message ?? 'Something happened');
      });
  };

  const handlerAddFabric = () => {
    setmodalAddFabric(true);
    settitleModalAdd('Associate Node to Fabric');
  };

  console.log(FABRIC);
  useEffect(() => {
    setTokenHeader();

    dispatch(messageData('loading'));
    vmat
      .checkUndelay()
      .then((response) => {
        setisUnderlayReady(false);
      })
      .catch((err) => {
        setisUnderlayReady(true);
      });
    handlerGetListNode();
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
        <Modal
          show={show}
          handlerOnChange={handlerOnChange}
          handlerShow={() => setshow(false)}
          handlerSubmit={handlerSetNewTunnel}
          isSubmit={isLoading}
        />

        {/* Modal Add Fabric  */}
        <ModalWithClose
          show={modalAddFabric}
          handlerModal={() => setmodalAddFabric(false)}
          title={titleModalAdd}>
          <FormAddFabric stateModal={setmodalAddFabric} />
        </ModalWithClose>

        {/* Modal view Data Vxlan */}
        <ModalWithClose
          show={showListVxlan}
          handlerModal={() => setshowListVxlan(false)}
          title={`List ${titleModalVxlan}`}>
          <ChildTableFabric data={FABRIC.dataVxlanByFabric} />
        </ModalWithClose>

        <ModalDelete
          isShow={showModalDelete}
          handlerClose={() => setshowModalDelete(false)}
          data={dataDelete}
          isSubmit={loadingDelete}
          handlerDelete={handlerDeleteNode}
        />

        <div className="w-full mt-8">
          <div className="w-full flex justify-between items-center mb-10">
            <h2 className="text-xl font-semibold text-gray-900">
              List Manage Fabric
            </h2>
            {!isUnderlayReady ? (
              <button
                onClick={() => setshow(true)}
                disabled={!isUnderlayReady ? true : false}
                className={`bg-apps-primary flex gap-2 rounded-md px-4 py-2 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out font-medium ${
                  !isUnderlayReady && 'disabled:opacity-50'
                }`}>
                {!isUnderlayReady && <LoadingIcon />}
                Deploy Tunnel
              </button>
            ) : (
              ''
            )}
          </div>
          {isUnderlayReady ? (
            <Table
              handlerOpenModal={() => handlerAddFabric()}
              handlerViewVxlanById={handlerGetListVxlanById}
              handlerDelete={handlerModalDelete}
            />
          ) : (
            <div className="flex justify-center items-center px-4 py-2">
              <LoadingIcon color="text-apps-primary" height={8} width={8} />
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
}
