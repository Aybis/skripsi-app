import {
  ServerIcon,
  TrashIcon,
  ViewGridAddIcon,
} from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import {
  Button,
  LoadingIcon,
  TableBody,
  TableContent,
  TableHeading,
} from '../atoms';
export default function SectionTableFabric({
  handlerViewVxlanById,
  handlerDelete,
}) {
  const FABRIC = useSelector((state) => state.fabric);

  return (
    <div className="overflow-x-auto">
      <div className="py-2 pb-8 align-middle inline-block min-w-full">
        <div className="overflow-hidden border-b border-gray-200">
          <TableHeading
            theading={['No', 'Node', 'Tunnel', 'Bridge', 'IBGP', 'Action']}>
            {FABRIC.dataNodes.length > 0 ? (
              FABRIC?.dataNodes?.map((item, index) => (
                <TableBody key={index + 1}>
                  <TableContent>{index + 1}</TableContent>
                  <TableContent>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <ServerIcon className="h-8 w-8 text-warmGray-700" />
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-medium text-gray-900">
                          {item.routerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.management}
                        </div>
                      </div>
                    </div>
                  </TableContent>
                  <TableContent>{item.tunnel}</TableContent>
                  <TableContent>
                    <Button
                      type="view"
                      handlerClick={() => handlerViewVxlanById(item)}>
                      <ViewGridAddIcon className="h-4 w-4 " />
                      View Bridge Domain
                    </Button>
                  </TableContent>
                  <TableContent>
                    <Button type="view">
                      <ViewGridAddIcon className="h-4 w-4 " />
                      View iBGP
                    </Button>
                  </TableContent>
                  <TableContent>
                    <Button
                      handlerClick={() => handlerDelete(item)}
                      type={'danger'}>
                      <TrashIcon className="h-4 w-4 " />
                      Delete Node
                    </Button>
                  </TableContent>
                </TableBody>
              ))
            ) : (
              <TableBody>
                <TableContent colSpan={6} rowSpan={6}>
                  <span className="flex gap-2 w-full items-center justify-center">
                    {FABRIC.message === 'loading' && (
                      <LoadingIcon color="text-apps-primary ml-2" />
                    )}
                    Data Kosong
                  </span>
                </TableContent>
              </TableBody>
            )}
          </TableHeading>
        </div>
      </div>
    </div>
  );
}
