import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { fetchListDataIbgp, insertIbgp } from '../../store/actions/ibgp';
import { Button, Dropdown, Input } from '../atoms';

export default function SectionFormIBGP({
  handlerModal,
  loading,
  handlerLoading,
}) {
  const FABRIC = useSelector((state) => state.fabric);
  const [routerSelected, setrouterSelected] = useState([]);
  const dispatch = useDispatch();

  const [form, setform] = useState({
    idRouter: '',
    interface: '',
    ipAddress: '',
  });

  const handlerChangeForm = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handlerChangeRouter = (event) => {
    form.idRouter = event.target.value;
    let dataInterface = FABRIC?.dataNodes?.filter(
      (item) => item._id === event.target.value,
    );
    setrouterSelected(dataInterface[0].interfaceList);
  };

  const handlerSubmit = async (event) => {
    handlerLoading(true);
    event.preventDefault();

    try {
      const result = await dispatch(insertIbgp(form));
      if (result.status === 200) {
        handlerLoading(false);
        handlerModal(false);
        dispatch(fetchListDataIbgp());
        swal('Yeay!', result.message, 'success');
      } else {
        handlerLoading(false);
        swal('Oh No!', result.message ?? 'Something Happened!', 'error');
      }
    } catch (error) {
      handlerLoading(false);
      swal('Oh No!', error.message ?? 'Something Happened!', 'error');
    }
  };

  return (
    <div className="relative my-4">
      <form onSubmit={handlerSubmit} className="w-1/2 flex flex-col">
        <Input
          label={'IP Address'}
          name={'ipAddress'}
          required={true}
          handlerChange={handlerChangeForm}
          value={form.ipAddress}
          placeholder="10.20.50.1/24"
          type="text"
        />
        <Dropdown
          name={'idRouter'}
          value={form.idRouter}
          handlerChange={handlerChangeRouter}
          label={'Node'}>
          {FABRIC?.dataNodes?.map((item) => (
            <option key={Math.random()} value={item._id}>
              {item.routerName}
            </option>
          ))}
        </Dropdown>

        {routerSelected.length > 0 ? (
          <Dropdown
            name={'interface'}
            value={form.interface}
            handlerChange={handlerChangeForm}
            label={'Interface'}>
            {routerSelected?.map((item) => (
              <option key={Math.random()} value={item}>
                {item}
              </option>
            ))}
          </Dropdown>
        ) : (
          ''
        )}

        {form.interface.length > 1 && (
          <Button disabled={loading} isLoading={loading} addClass={'mt-6'}>
            Associate into iBGP
          </Button>
        )}
      </form>
    </div>
  );
}
