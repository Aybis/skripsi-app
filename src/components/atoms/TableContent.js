import React from 'react';

export default function TableContent({
  addClassRow,
  addClassChild,
  children,
  rowSpan = 1,
  colSpan = 1,
  handlerClick = null,
  data,
}) {
  return (
    <td
      onClick={handlerClick}
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={[addClassRow].join(' ')}>
      <div
        className={[
          'px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800',
          addClassChild,
        ].join(' ')}>
        {children}
      </div>
    </td>
  );
}
