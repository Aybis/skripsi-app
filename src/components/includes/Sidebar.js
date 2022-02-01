import {
  HomeIcon,
  ServerIcon,
  ShareIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import {
  HomeIcon as HomeSolid,
  ServerIcon as ServerSolid,
  ShareIcon as ShareSolid,
  UserGroupIcon as UserSolid,
} from '@heroicons/react/solid';
import { NavLink, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, isActive: HomeSolid },
  { name: 'Fabric', href: '/fabric', icon: ShareIcon, isActive: ShareSolid },
  {
    name: 'Bridge Domain',
    href: '/bridge',
    icon: ServerIcon,
    isActive: ServerSolid,
  },
  { name: 'iBGP', href: '/ibgp', icon: ServerIcon, isActive: ServerSolid },
  { name: 'About Us', href: '/us', icon: UserGroupIcon, isActive: UserSolid },
];

export default function Sidebar() {
  let location = useLocation();

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className="hidden md:flex md:flex-shrink-0 bg-white">
      <div className="w-64 flex flex-col ">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="border-r border-gray-200 pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
          <div className="flex-shrink-0 px-4 flex items-center justify-center gap-2">
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
            <h1 className="text-2xl text-blue-600 font-bold tracking-wide">
              V-Mat
            </h1>
          </div>
          <div className="flex-grow mt-5 flex flex-col">
            <nav className="flex-1 bg-white px-2 space-y-3 py-6 gap-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  exact
                  className={classNames(
                    location.pathname === item.href
                      ? 'bg-gray-50 text-apps-primary'
                      : 'text-gray-400 hover:bg-gray-50 hover:text-apps-primary',
                    'group rounded-md py-3 px-4 flex items-center font-semibold tracking-wide transition-all duration-300 ease-in-out text-sm',
                  )}>
                  {location.pathname === item.href ? (
                    <item.isActive
                      className={classNames(
                        location.pathname === item.href
                          ? 'text-apps-primary'
                          : 'text-gray-300 group-hover:text-apps-primary',
                        'mr-3 flex-shrink-0 h-5 w-5',
                      )}
                      aria-hidden="true"
                    />
                  ) : (
                    <item.icon
                      className={classNames(
                        location.pathname === item.href
                          ? 'text-apps-primary'
                          : 'text-gray-300 group-hover:text-apps-primary',
                        'mr-3 flex-shrink-0 h-5 w-5',
                      )}
                      aria-hidden="true"
                    />
                  )}
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
