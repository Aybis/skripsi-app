import {
  ClipboardListIcon,
  PlusSmIcon,
  ServerIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import axios from "axios";

/* This example requires Tailwind CSS v2.0+ */
const routersInit = [
  {
    name: "JKT-01-GW1",
    location: "Jakarta",
    ip: "10.0.0.1/22",
    vxlan: 4,
    ospf: 5,
    email: "jane.cooper@example.com",
  },
  // More routers...
];

export default function Table({
  title,
  handlerOpenModal,
  handlerAddOSPFandVlan,
  handlerDetailDataOSPFOrVXLAN,
}) {
  const [routers, setRouters] = useState(routersInit);
  useEffect(() => {
    const callServer = async () => {
      const options = {
        method: "GET",
        url: "http://localhost:8000/inventory/router",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      const { data } = await axios.request(options);
      const fetchedRouter = data.map((rtr) => {
        return {
          name: rtr.routerName,
          location: rtr.role,
          ip: rtr.management,
          vxlan: 4,
          ospf: 5,
          email: "jane.cooper@example.com",
        };
      });
      setRouters(fetchedRouter);
    };
    callServer();
  });
  return (
    <>
      <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
        <div className="sm:flex items-center justify-between">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            List {title}
          </p>
          <div>
            <button
              onClick={handlerOpenModal}
              className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-center justify-center gap-2 px-6 py-3 bg-apps-primary hover:bg-blue-600 focus:outline-none rounded"
            >
              <PlusSmIcon className="h-5 w-5 text-white" />
              <p className="text-sm font-medium leading-none text-white">
                Add Node to Fabric
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 pb-8 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Node
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tunnel IP
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      VXLAN List
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      OSPF Network Advertisement
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {routers.map((router, index) => (
                    <tr key={router.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <ServerIcon className="h-8 w-8 text-warmGray-700" />
                          </div>
                          <div className="ml-4">
                            <div className="text-base font-medium text-gray-900">
                              {router.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {router.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-700">
                          {router.ip}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        <button
                          onClick={() =>
                            handlerDetailDataOSPFOrVXLAN(4, "VXLAN")
                          }
                          className="flex gap-1 items-center text-blue-600 hover:text-blue-900 font-medium border-b border-blue-600 hover:border-blue-900 pb-1"
                        >
                          <ViewGridAddIcon className="h-4 w-4 " />
                          View VXLAN
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        <button
                          onClick={() =>
                            handlerDetailDataOSPFOrVXLAN(6, "OSPF")
                          }
                          className="flex gap-1 items-center text-blue-600 hover:text-blue-900 font-medium border-b border-blue-600 hover:border-blue-900 pb-1"
                        >
                          <ViewGridAddIcon className="h-4 w-4 " />
                          View OSPF
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium grid grid-row-3 gap-1">
                        <button className="flex gap-1 items-center text-green-400 hover:text-green-900 font-medium">
                          <ClipboardListIcon className="h-4 w-4 " />
                          View Fabric
                        </button>
                        <button
                          onClick={() =>
                            handlerAddOSPFandVlan(router.name, "OSPF")
                          }
                          className="flex gap-1 items-center text-blue-600 hover:text-blue-900 font-medium"
                        >
                          <PlusSmIcon className="h-4 w-4 " />
                          Add OSPF
                        </button>
                        <button
                          onClick={() =>
                            handlerAddOSPFandVlan(router.name, "VXLAN")
                          }
                          className="flex gap-1 items-center text-blue-600 hover:text-blue-900 font-medium"
                        >
                          <PlusSmIcon className="h-4 w-4 " />
                          Add VXLAN
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
