import React from 'react';
import { useSelector } from 'react-redux';
import { LoadingIcon, TableBody, TableContent, TableHeading } from '../atoms';

export default function TableBridge() {
  const FABRIC = useSelector((state) => state.fabric);
  return (
    <TableHeading
      theading={['No', 'Bridge domain name', 'vni id', 'interface']}>
      {FABRIC.loading ? (
        <TableBody key={Math.random()}>
          <TableContent
            colSpan={4}
            rowSpan={4}
            addClassChild={'flex justify-center items-center'}>
            <LoadingIcon height={6} width={6} color="text-blue-600" />
          </TableContent>
        </TableBody>
      ) : FABRIC.listBridge.length > 0 ? (
        FABRIC.listBridge.map((item, index) => (
          <TableBody key={Math.random()}>
            <TableContent>{index + 1}</TableContent>
            <TableContent>{item.bdName}</TableContent>
            <TableContent>{item.vniId}</TableContent>
            <TableContent>
              {item?.interfaceMember?.length > 0
                ? item?.interfaceMember?.map((item) => item).join('/n')
                : 'Belum ada interface'}
            </TableContent>
          </TableBody>
        ))
      ) : (
        <TableBody key={Math.random()}>
          <TableContent
            colSpan={4}
            rowSpan={4}
            data={'Data Kosong'}
            addClassChild={'flex justify-center items-center'}>
            Data Kosong
          </TableContent>
        </TableBody>
      )}
    </TableHeading>
  );
}
