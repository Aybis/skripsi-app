import { ExclamationIcon, PlusSmIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { deleteIbgp, fetchListDataIbgp } from '../../store/actions/ibgp';
import { Button, Modals } from '../atoms';
import Content from '../includes/Content';
import Layout from '../includes/Layout';
import { SectionTableIBGP } from '../molecules';
import SectionFormIBGP from '../molecules/SectionFormIBGP';

export default function IBGP() {
  const dispatch = useDispatch();
  const [isSubmit, setisSubmit] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [buttonType, setbuttonType] = useState({
    name: '',
    data: '',
  });

  const handlerModal = (event, item) => {
    setbuttonType({
      name: event.target.name,
      data: item,
    });

    setshowModal(true);
  };

  const handlerDelete = async (event) => {
    setisSubmit(true);
    event.preventDefault();

    try {
      const result = await dispatch(
        deleteIbgp({ id_ibgp: buttonType.data._id }),
      );
      if (result.status === 200) {
        setisSubmit(false);
        setshowModal(false);
        dispatch(fetchListDataIbgp());

        swal('Yeay!', result.message, 'success');
      } else {
        setisSubmit(false);

        swal('Oh No!', result.message ?? 'Something Happened!', 'error');
      }
    } catch (error) {
      setisSubmit(false);

      swal('Oh No!', error.message ?? 'Something Happened!', 'error');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout>
      <Content title="ibgp">
        <div className="relative bg-white p-4 rounded-md mt-6">
          <Button name={'add'} handlerClick={handlerModal} type={'primary'}>
            <PlusSmIcon className="h-5 w-5 text-white" />
            Add Block IP Address
          </Button>
          <div className="relative mt-4">
            <SectionTableIBGP handlerDelete={handlerModal} />
          </div>
        </div>
      </Content>

      <Modals
        handlerShow={setshowModal}
        show={showModal}
        title={
          buttonType.name === 'add' ? (
            'Add Block IP Address into iBGP Table'
          ) : (
            <span className="flex gap-2">
              <ExclamationIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />{' '}
              Remove Block IP Address from iBGP Table
            </span>
          )
        }
        isLoading={isSubmit}>
        {buttonType.name === 'add' ? (
          <SectionFormIBGP
            loading={isSubmit}
            handlerLoading={setisSubmit}
            handlerModal={setshowModal}
          />
        ) : buttonType.data !== '' ? (
          <form onSubmit={handlerDelete}>
            <p className="mt-4 font-medium text-gray-700 ">
              Are you sure want to delete this Block IP{' '}
              {buttonType.data.ipAddress} !
            </p>
            <Button
              isLoading={isSubmit}
              disabled={isSubmit}
              type="danger"
              addClass={'mt-4'}>
              Delete Block
            </Button>
          </form>
        ) : (
          ''
        )}
      </Modals>
    </Layout>
  );
}
