import React from 'react';

export default function TableBody({ children }) {
  return (
    <tr className="text-sm font-semibold leading-none text-gray-800 bg-white hover:bg-gray-50 border-b border-t border-gray-100">
      {children}
    </tr>
  );
}
