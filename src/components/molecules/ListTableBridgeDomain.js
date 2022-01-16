import { DatabaseIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setName } from '../../store/actions/bridge';
import { LoadingIcon, TableBody, TableContent, TableHeading } from '../atoms';

export default function ListTableBridgeDomain({ handlerModalAssociateNode }) {
  const BRIDGE = useSelector((state) => state.bridge);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlerClick = (data) => {
    dispatch(setName(data));
    history.push(`/bridge/associate/${data._id}`);
  };

  return (
    <TableHeading
      theading={['No', 'Bridge domain', 'bridge id', 'vni', ' ']}
      addClass={'text-left'}>
      {BRIDGE.status === 'idle' ? (
        <TableBody>
          <TableContent
            colSpan={5}
            rowSpan={5}
            addClassChild={'flex justify-center items-center'}>
            <LoadingIcon color="text-blue-600" height={6} width={6} />
          </TableContent>
        </TableBody>
      ) : BRIDGE.dataBridgeDomain.length > 0 ? (
        BRIDGE.dataBridgeDomain.map((item, index) => (
          <TableBody key={Math.random()}>
            <TableContent>{index + 1}</TableContent>
            <TableContent handlerClick={() => handlerClick(item)}>
              <div className="flex items-center cursor-pointer">
                <div className="w-10 h-10">
                  <DatabaseIcon className="text-blue-600 h-8 w-8" />
                </div>
                <div className="pl-2">
                  <p className="font-semibold text-blue-600 tracking-wide">
                    {item.bdName}
                  </p>
                </div>
              </div>
            </TableContent>
            <TableContent>{item._id}</TableContent>
            <TableContent>{item.vniId}</TableContent>
            <TableContent>
              <div className="ml-14 flex flex-col gap-2">
                <button
                  onClick={() => handlerModalAssociateNode(item)}
                  className="flex gap-1 items-center text-green-600 hover:text-green-700 font-medium">
                  <PlusIcon className="h-4 w-4 " />
                  Associate Node
                </button>
                <button
                  onClick={() => alert('test -')}
                  className="flex gap-1 items-center text-red-600 hover:text-red-900 font-medium">
                  <TrashIcon className="h-4 w-4 " />
                  Delete Bridge
                </button>
              </div>
            </TableContent>
          </TableBody>
        ))
      ) : (
        <TableBody>
          <TableContent
            colSpan={5}
            rowSpan={5}
            addClassChild={'flex justify-center items-center'}>
            Data Kosong
          </TableContent>
        </TableBody>
      )}
    </TableHeading>
  );
}
