import {
  CogIcon,
  DatabaseIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSelectBridge } from '../../store/actions/bridge';
import {
  Button,
  LoadingIcon,
  TableBody,
  TableContent,
  TableHeading,
} from '../atoms';

export default function SectionTableBridge({
  handlerModalAssociateNode,
  handlerDelete,
  loadingFetch,
}) {
  const BRIDGE = useSelector((state) => state.bridge);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlerBridgeDetail = (data) => {
    dispatch(setSelectBridge(data));
    history.push(`/bridge/associate/${data._id}`);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BRIDGE]);

  return (
    <>
      <div className="relative mb-6">
        <TableHeading
          theading={[
            'No',
            'Bridge domain',
            'bridge id',
            'vni',
            'Associate Node',
            'Action',
          ]}>
          {BRIDGE.loading ? (
            <TableBody>
              <TableContent rowSpan={6} colSpan={6}>
                <div className="flex justify-center items-center">
                  <LoadingIcon color={'text-blue-600'} />
                </div>
              </TableContent>
            </TableBody>
          ) : BRIDGE?.listBridge?.length > 0 ? (
            BRIDGE?.listBridge?.map((item, index) => {
              return (
                <TableBody key={Math.random()}>
                  <TableContent>{index + 1}</TableContent>
                  <TableContent>
                    <div className="flex items-center cursor-pointer">
                      <div className="w-10 h-10">
                        <DatabaseIcon className="text-gray-500 h-8 w-8" />
                      </div>
                      <div className="pl-2">
                        <p className="font-semibold text-gray-700 ">
                          {item.bdName}
                        </p>
                      </div>
                    </div>
                  </TableContent>
                  <TableContent>{item._id}</TableContent>
                  <TableContent>{item.vniId}</TableContent>
                  <TableContent>
                    <Button handlerClick={() => handlerBridgeDetail(item)}>
                      <CogIcon className="h-4" />
                      Manage Associate Node
                    </Button>
                  </TableContent>
                  <TableContent>
                    <div className="flex  gap-2">
                      <Button
                        addClass={'hidden'}
                        handlerClick={() => handlerModalAssociateNode(item)}>
                        <PlusIcon className="h-4 w-4 " />
                        Associate Node
                      </Button>
                      <Button
                        type="danger"
                        handlerClick={() => handlerDelete(item)}>
                        <TrashIcon className="h-4 w-4 " />
                        Delete Bridge
                      </Button>
                    </div>
                  </TableContent>
                </TableBody>
              );
            })
          ) : (
            <TableBody>
              <TableContent rowSpan={6} colSpan={6}>
                <div className="flex justify-center items-center">
                  Tidak Ada Data
                </div>
              </TableContent>
            </TableBody>
          )}
        </TableHeading>
      </div>
    </>
  );
}
