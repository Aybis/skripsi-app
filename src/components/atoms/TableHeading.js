import React from 'react';

export default function Tables({ theading, children, addClass }) {
  return (
    <div className="bg-white pt-4 md:pt-4 pb-5 overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead className="bg-warmGray-100">
          <tr className="h-16 w-full leading-none text-gray-400 border-b-2 border-gray-200">
            {theading.map((item) => (
              <th
                key={Math.random()}
                className={[
                  'font-semibold tracking-wide uppercase px-4',
                  addClass,
                ].join(' ')}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full">{children}</tbody>
      </table>
    </div>
  );
}
