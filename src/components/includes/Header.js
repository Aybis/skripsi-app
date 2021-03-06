import { Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuAlt2Icon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { imageApi } from '../../helpers/Asset';
import { convertDate } from '../../helpers/convertDate';
import ToastHandler from '../../helpers/toast';
import Cookies from 'js-cookie';

const userNavigation = [{ name: 'Sign out', href: 'logout' }];

const handlerLogOut = (val) => {
  if (val === 'logout') {
    // remove cookies
    Cookies.remove('session');
    // remove token
    localStorage.clear();
    ToastHandler('success', 'Logout Berhasil');
    swal('Yeay', 'Anda Berhasil Logout!', 'success');

    // redirect link
    <Redirect push to="/login" />;
    // reload page
    window.location.reload();
  }
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header({ handlerSidebar }) {
  const USER = useSelector((state) => state.user);
  return (
    <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex px-6">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={handlerSidebar}>
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 flex justify-between px-4 md:px-0">
        <div className="flex-1 flex items-center">
          <p className="text-warmGray-400 text-sm font-light">
            {convertDate('tanggalHari')}
          </p>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="hidden bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="max-w-xs p-1 flex items-center text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-10 w-10 rounded-md"
                  src={imageApi(USER?.profile?.firstname)}
                  alt={USER?.profile?._id}
                />
                <p className="text-sm ml-2 font-medium text-gray-700 hidden lg:block">
                  {USER?.profile?.firstname
                    ? USER?.profile?.firstname + ' ' + USER?.profile?.lastname
                    : 'Anonymous'}
                </p>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <div
                        onClick={() => handlerLogOut(item.href)}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block py-2 px-4 text-sm text-gray-700 cursor-pointer',
                        )}>
                        {item.name}
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
