import React from 'react';

export default function Tables({ theading, children, addClass }) {
  return (
    <div
      className="overflow-auto border-b-2 border-warmGray-200"
      style={{
        maxHeight: '40rem',
      }}>
      <table className="min-w-full divide-y divide-gray-200 relative h-full overflow-auto">
        <thead className="bg-blue-100 sticky top-0">
          <tr className="sticky top-0 h-16 w-full leading-none text-gray-400 border-b-2 border-gray-200">
            {theading.map((item) => (
              <th
                key={Math.random()}
                scope="col"
                className={[
                  'px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase  whitespace-nowrap',
                  addClass,
                ].join(' ')}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
}
