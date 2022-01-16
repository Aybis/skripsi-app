import React from 'react';
import { Modals } from '.';
import LoadingIcon from './LoadingIcon';

export default function FormDeployTunnel({
  show,
  handlerShow,
  title,
  handlerSubmit,
  handlerOnChange,
  isSubmit,
}) {
  return (
    <Modals
      show={show}
      handlerShow={handlerShow}
      title={title}
      isLoading={isSubmit}>
      <form onSubmit={handlerSubmit} className="mt-6">
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
                name="ipAddressUnderlay"
                placeholder="192.168.1.0/24"
                onChange={handlerOnChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full  sm:text-sm border-gray-300 placeholder-gray-400 font-medium placeholder-opacity-80 rounded-md tracking-wide"
              />
              <button
                type="submit"
                disabled={isSubmit}
                className="flex w-auto mt-4 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm disabled:opacity-50">
                {isSubmit && <LoadingIcon />}
                Deploy Underlay
              </button>

              <p className="text-sm text-left mt-8 text-gray-500 tracking-wide">
                This setup is for first deployment only. when its deployed,
                there is no another way to change it unless reset all fabric and
                deploy from beginning, chose your block ip carefully.
                <br />
                <br />
                This IP will be tunnel ip address each node on branch and one
                for Head Office. Recomended is using block ip private address
                with /22 for optimal scalability and this IP should not
                interference by any another network
              </p>
            </div>
          </div>
        </div>
      </form>
    </Modals>
  );
}
