import React from 'react';
import { LoadingIcon } from '.';

export default function Button({
  type = 'primary',
  handlerClick,
  name,
  value,
  children,
  addClass,
  isLoading,
  disabled,
}) {
  return (
    <button
      name={name}
      onClick={handlerClick}
      disabled={disabled}
      className={[
        'disabled:opacity-40 px-4 py-2 rounded-md flex gap-2 justify-center items-center text-white font-semibold text-sm cursor-pointer transition-all duration-300 ease-in-out',
        type === 'primary' && 'bg-apps-primary hover:bg-blue-700',
        type === 'danger' && 'bg-red-500 hover:bg-red-700',
        type === 'edit' && 'bg-green-500 hover:bg-green-700',
        type === 'view' && 'bg-indigo-500 hover:bg-indigo-700',
        disabled && 'cursor-not-allowed',
        addClass,
      ].join(' ')}>
      {isLoading && <LoadingIcon color="text-white" height={5} width={5} />}
      {children}
    </button>
  );
}
