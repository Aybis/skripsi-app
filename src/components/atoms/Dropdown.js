import React from 'react';

export default function Dropdown({
  name,
  value,
  handlerChange,
  children,
  label,
  addClass,
  addClassLabel,
  addClassDropdown,
}) {
  return (
    <div className={['my-2', addClass].join(' ')}>
      <label
        htmlFor={name}
        className={[
          'block text-sm font-medium text-gray-700',
          addClassLabel,
        ].join(' ')}>
        {label}
      </label>
      <select
        name={name}
        className={[
          'mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md',
          addClassDropdown,
        ].join(' ')}
        onChange={handlerChange}
        value={value.length > 1 ? value : 'DEFAULT'}>
        <option disabled value={'DEFAULT'}>
          Pilih {label}
        </option>
        {children}
      </select>
    </div>
  );
}
