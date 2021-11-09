import React from 'react';
import LoadingIcon from './LoadingIcon';

export default function ChildTableFabric({ data }) {
  return (
    <>
      <div className="bg-white px-4 md:px-10 pt-4 md:pt-4 pb-5 overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-400">
              <th className="font-medium tracking-wide text-left pl-4">No</th>
              <th className="font-medium tracking-wide text-left pl-4 capitalize">
                Bridge Domain Name
              </th>
              <th className="font-medium tracking-wide text-left">VNI ID</th>
              <th className="font-medium tracking-wide text-left pl-12">
                Interface
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={Math.random()}
                  className="h-20 text-sm font-semibold leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                  <td className="pl-4">
                    <p className="text-sm leading-none text-gray-400">
                      {index + 1}
                    </p>
                  </td>
                  <td className="pl-4">
                    <div className="flex items-center">
                      <div className="pl-4">
                        <p className="font-semibold text-gray-800 tracking-wide">
                          {item.bdName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <p
                      key={Math.random()}
                      className="text-sm font-medium leading-none text-gray-600">
                      {item.vniId}
                    </p>
                  </td>
                  <td className="pl-12">
                    {item?.interfaceMember?.map((data) => (
                      <p
                        key={Math.random()}
                        className="text-sm font-medium leading-none text-gray-600">
                        {data},
                      </p>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td rowSpan={4} className="text-center">
                  <LoadingIcon color="text-apps-primary" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
