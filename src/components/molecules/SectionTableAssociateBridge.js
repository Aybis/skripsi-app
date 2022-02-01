import {
  MinusIcon,
  PlusIcon,
  ServerIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  LoadingIcon,
  TableBody,
  TableContent,
  TableHeading,
} from '../atoms';

export default function SectionTableAssociateBridge({ handlerShowModalForm }) {
  const BRIDGE = useSelector((state) => state.bridge);

  return (
    <TableHeading theading={['No', 'Associated Node', 'Interface', 'Action']}>
      {BRIDGE.loading ? (
        <TableBody>
          <TableContent colSpan={4} rowSpan={4}>
            <div className="flex justify-center items-center">
              <LoadingIcon color="text-apps-primary" height={8} width={8} />
            </div>
          </TableContent>
        </TableBody>
      ) : BRIDGE.listNodeByBridge.length > 0 ? (
        BRIDGE.listNodeByBridge.map((item, index) => (
          <TableBody key={Math.random()}>
            <TableContent>{index + 1}</TableContent>
            <TableContent>
              <div className="flex items-center">
                <div className="w-10 h-10">
                  <ServerIcon className="text-gray-500 h-8 w-8" />
                </div>
                <div className="pl-4">
                  <p className="font-semibold text-gray-800 tracking-wide">
                    {item.routerName}
                  </p>
                  <p className="text-xs leading-3 text-gray-800 pt-2">
                    {item.bdName}
                  </p>
                </div>
              </div>
            </TableContent>
            <TableContent>
              <p className="text-sm font-medium leading-none text-gray-800 text-left">
                {item.interfaceMember.length > 0
                  ? item.interfaceMember.map((item) => `${item},  `)
                  : 'Belum ada interface'}
              </p>
            </TableContent>
            <TableContent>
              <div className="flex w-72 gap-2 p-4">
                <Button
                  type={'danger'}
                  name={'deleteNode'}
                  handlerClick={(e) => handlerShowModalForm(e, item)}>
                  <TrashIcon className="h-4 w-4 " />
                  Deassociate Node
                </Button>

                <Button
                  name={'addInterface'}
                  handlerClick={(e) => handlerShowModalForm(e, item)}>
                  <PlusIcon className="h-4 w-4 " />
                  Add Interface
                </Button>

                {item.interfaceMember.length > 0 ? (
                  <Button
                    type={'danger'}
                    name="deleteInterface"
                    handlerClick={(e) => handlerShowModalForm(e, item)}>
                    <MinusIcon className="h-4 w-4 " />
                    Deassociate Interface
                  </Button>
                ) : (
                  ''
                )}
              </div>
            </TableContent>
          </TableBody>
        ))
      ) : (
        <TableBody>
          <TableContent colSpan={4} rowSpan={4}>
            <div className="flex justify-center items-center">
              <p>Belum Ada Node</p>
            </div>
          </TableContent>
        </TableBody>
      )}
    </TableHeading>
  );
}
