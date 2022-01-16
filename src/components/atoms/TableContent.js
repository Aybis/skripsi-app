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
        className={['font-medium text-gray-800 px-4', addClassChild].join(' ')}>
        {children}
      </div>
    </td>
  );
}
