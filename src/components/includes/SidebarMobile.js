import { Transition } from '@headlessui/react';
import {
  HomeIcon,
  ServerIcon,
  ShareIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Fabric', href: '/fabric', icon: ShareIcon },
  { name: 'VXLAN', href: '/vxlan', icon: ServerIcon },
  { name: 'OSPF', href: '/ospf', icon: ServerIcon },
  { name: 'About Us', href: '/us', icon: UserGroupIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SidebarMobile({ handlerSidebar }) {
  let location = useLocation();

  return (
    <Transition.Child
      as={Fragment}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full">
      <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={handlerSidebar}>
              <span className="sr-only">Close sidebar</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </Transition.Child>
        {/* Sidebar Mobile */}
        <div className="flex-shrink-0 px-4 flex items-center">
          <svg
            id="logo-35"
            width="50"
            height="39"
            viewBox="0 0 50 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            {' '}
            <path
              d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
              className="ccompli1"
              fill="#007AFF"></path>{' '}
            <path
              d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
              className="ccustom"
              fill="#312ECB"></path>{' '}
          </svg>
          <h1 className="text-xl ml-2 text-blue-600 font-bold tracking-wider">
            Skripsi
          </h1>
        </div>
        <div className="mt-5 flex-1 h-0 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                exact
                className={classNames(
                  location.pathname === item.href
                    ? 'bg-gray-100 text-apps-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-apps-primary',
                  'group rounded-md py-2 px-2 flex items-center text-base font-medium',
                )}>
                <item.icon
                  className={classNames(
                    location.pathname === item.href
                      ? 'text-apps-primary'
                      : 'text-gray-400 group-hover:text-apps-primary',
                    'mr-4 flex-shrink-0 h-6 w-6',
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </Transition.Child>
  );
}
