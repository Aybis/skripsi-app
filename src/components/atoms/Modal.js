/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function Modal({ show, handlerShow, title }) {
  const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full lg:max-w-5xl sm:p-6">
              <div>
                <div className="mt-3 text-left borderb sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl leading-6 font-medium text-warmGray-900 border-b pb-6 -mt-4">
                    Deploy Fabric
                  </Dialog.Title>
                  <div className="mt-6">
                    <div className="flex flex-col gap-4">
                      <div className="mt-1 flex gap-4">
                        <label
                          htmlFor="first-name"
                          className="block text-sm tracking-wide text-left font-medium text-warmGray-700 w-44">
                          Insert underlay tunnel Block IP
                        </label>
                        <div className="flex flex-col w-1/2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            placeholder="192.168.1.0/24"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full  sm:text-sm border-gray-300 placeholder-gray-400 font-medium placeholder-opacity-80 rounded-md tracking-wide"
                          />
                          <button
                            onClick={() => setOpen(false)}
                            className="flex w-36 mt-4 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                            Deploy Underlay
                          </button>

                          <p className="text-sm text-left mt-8 text-gray-500 tracking-wide">
                            This setup is for first deployment only. when its
                            deployed, there is no another way to change it
                            unless reset all fabric and deploy from beginning,
                            chose your block ip carefully. This IP will be
                            tunnel ip address each node on branch and one for
                            Head Office. recomended is using block ip private
                            address with /22 for optimal scalability and this IP
                            should not interference by any another network
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
