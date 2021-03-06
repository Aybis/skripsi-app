import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { Modals } from '.';
import vmat from '../../config/api/vmat';
import { setTokenHeader } from '../../config/axios';
import { fetchNode, messageData } from '../../store/actions/fabric';
import LoadingIcon from './LoadingIcon';

export default function FormAddFabric({ show, handlerShow, title }) {
  const dispatch = useDispatch();
  // var icon eye untuk kondisi ketika type password menjadi text begitu sebaliknya
  const [isShowPassword, setisShowPassword] = useState(false);
  // var untuk ganti type form password menjadi text dan sebaliknya
  const [isPassword, setisPassword] = useState('password');
  const [isSubmit, setisSubmit] = useState(false);

  const [form, setForm] = useState({
    routerName: '',
    management: '',
    routerUsername: '',
    routerPassword: '',
    role: '',
    keyApi: 'binus2021',
    nhrpSecret: '12345',
    bgp: {},
    localAs: '',
    remoteAs: '',
  });

  const handlerOnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // function untuk show text password
  const handlerClick = () => {
    setisShowPassword(!isShowPassword);
    if (isPassword === 'text') {
      setisPassword('password');
    } else {
      setisPassword('text');
    }
  };

  const handlerSubmitAdd = (event) => {
    setisSubmit(true);
    event.preventDefault();

    form.bgp = {
      localAs: 65010,
      remoteAs: 65010,
    };

    delete form.localAs;
    delete form.remoteAs;

    setTokenHeader();
    vmat
      .addNode(form)
      .then((response) => {
        setisSubmit(false);
        swal({
          title: response.data.message ?? 'Node Successfully Added',
          icon: 'success',
        });
        dispatch(messageData('loading'));

        dispatch(fetchNode());
        handlerShow(false);
        // reset value input tu string
        form.routerName = '';
        form.management = '';
        form.routerUsername = '';
        form.routerPassword = '';
        form.role = '';
      })
      .catch((err) => {
        setisSubmit(false);
        swal({
          title: err.response.data.message ?? 'Something Happened!',
          icon: 'error',
        });
      });
  };

  return (
    <Modals
      show={show}
      handlerShow={handlerShow}
      title={title}
      isLoading={isSubmit}>
      <form onSubmit={handlerSubmitAdd} className="mt-4">
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="router-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Router Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="routerName"
                required
                value={form.routerName}
                onChange={handlerOnChange}
                placeholder="JKT-SPOKE"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-medium sm:max-w-xs sm:text-sm border-gray-300 rounded-md placeholder-gray-400 placeholder-opacity-60"
              />
              <p className="text-xs text-gray-500 mt-1">
                Penamaan diharapkan menggunakan nama dari role yang dipilih
                NODE-SPOKE.
              </p>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="management"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Management
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="management"
                value={form.management}
                onChange={handlerOnChange}
                required
                placeholder="220.110.134.1/24"
                className="placeholder-gray-400 placeholder-opacity-60 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                IP yang diinput tidak boleh sama dengan Node yang lain.
              </p>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="router-username"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Router Username
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                name="routerUsername"
                value={form.routerUsername}
                onChange={handlerOnChange}
                required
                autoComplete="off"
                type="text"
                placeholder="vyos"
                className="placeholder-gray-400 placeholder-opacity-60 block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="router-password"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Router Password
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                name="routerPassword"
                value={form.routerPassword}
                onChange={handlerOnChange}
                type={isPassword}
                required
                placeholder="*******"
                className="placeholder-gray-400 placeholder-opacity-60 block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
              <div
                className="absolute right-20 -mt-7 cursor-pointer"
                onClick={handlerClick}>
                {isShowPassword ? (
                  <EyeIcon className="h-4 w-4 text-warmGray-600" />
                ) : (
                  <EyeOffIcon className="h-4 w-4 text-warmGray-600" />
                )}
              </div>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Role
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <select
                name="role"
                defaultValue={form.role}
                onChange={handlerOnChange}
                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                <option disabled value="">
                  Pilih Role
                </option>
                <option value="hub">HUB</option>
                <option value="spoke">SPOKE</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Pilih Role dengan nilai HUB untuk pertama kali menambahkan node!
              </p>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <button
                disabled={isSubmit}
                type="submit"
                className="mt-4 inline-flex gap-2 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                {isSubmit && <LoadingIcon />}
                Add Node to Fabric
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modals>
  );
}
