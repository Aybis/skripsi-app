import { ArrowLeftIcon } from '@heroicons/react/solid';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function SectionBackMenu() {
  const history = useHistory();

  return (
    <div
      onClick={() => history.goBack()}
      className="relative flex items-center gap-2 mt-2 text-sm font-medium text-warmGray-500 hover:text-warmGray-900 transition-all duration-300 ease-in-out cursor-pointer">
      <ArrowLeftIcon className="h-4 rounded-md" />
      Back
    </div>
  );
}
