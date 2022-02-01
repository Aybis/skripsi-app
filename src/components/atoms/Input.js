import React from 'react';

export default function Input({
  label,
  addClassLabel,
  desc,
  name,
  value,
  handlerChange,
  type = 'text',
  addClassInput,
  disabled = false,
  required = false,
  readonly = false,
  placeholder = 'Type placeholder',
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className={[
          'block text-sm font-medium text-gray-700',
          addClassLabel,
        ].join(' ')}>
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          disabled={disabled}
          required={required}
          readOnly={readonly}
          value={value}
          onChange={handlerChange}
          className={[
            'shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-300',
            addClassInput,
          ].join(' ')}
          placeholder={placeholder}
          aria-describedby="ip-address"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500" id="email-description">
        {desc}
      </p>
    </div>
  );
}
