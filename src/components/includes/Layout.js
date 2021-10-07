import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import SidebarMobile from './SidebarMobile';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-white overflow-hidden flex">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <SidebarMobile handlerSidebar={() => setSidebarOpen(false)} />
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <Sidebar />
      <div className="flex-1 px-6 py-4 w-0 flex flex-col md:px-8">
        <Header handlerSidebar={() => setSidebarOpen(true)} />
        {children}
      </div>
    </div>
  );
}
