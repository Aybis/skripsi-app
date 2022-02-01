import { TrashIcon } from '@heroicons/react/solid';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  LoadingIcon,
  TableBody,
  TableContent,
  TableHeading,
} from '../atoms';

export default function SectionTableIBGP({
  handlerDelete,
  isLoading,
  isSelected,
}) {
  const IBGP = useSelector((state) => state.ibgp);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [IBGP]);

  return (
    <>
      <div className="relative mb-6">
        <TableHeading
          theading={['No', 'IP Address', 'Node', 'Interface', 'Action']}
          addClass={'text-left'}>
          {IBGP.loading ? (
            <TableBody>
              <TableContent
                colSpan={5}
                rowSpan={5}
                addClassChild={'flex justify-center items-center'}>
                <LoadingIcon color="text-blue-600" height={6} width={6} />
              </TableContent>
            </TableBody>
          ) : IBGP?.listIbgp?.length > 0 ? (
            IBGP?.listIbgp?.map((item, index) => (
              <TableBody key={Math.random()}>
                <TableContent>{index + 1}</TableContent>
                <TableContent>{item.ipAddress}</TableContent>
                <TableContent>{item.routerName}</TableContent>
                <TableContent>{item.interface}</TableContent>
                <TableContent>
                  <Button
                    isLoading={isLoading && isSelected === item.ipAddress}
                    name={'delete'}
                    handlerClick={(e) => handlerDelete(e, item)}
                    type="danger">
                    <TrashIcon className="h-4 w-4 " />
                    Delete IBGP
                  </Button>
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
      </div>
    </>
  );
}
