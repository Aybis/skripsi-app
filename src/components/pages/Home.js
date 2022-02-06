import { ServerIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDataDetailTunnelActive,
  fetchNode,
} from '../../store/actions/fabric';
import { LoadingIcon } from '../atoms';
import Content from '../includes/Content';
import Layout from '../includes/Layout';

export default function Home() {
  const FABRIC = useSelector((state) => state.fabric);
  const [didMount, setDidMount] = useState(false);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchNode());
    dispatch(fetchDataDetailTunnelActive());
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!didMount) {
    return null;
  }

  return (
    <Layout>
      <Content title="Dashboard">
        <div className="relative mt-8 ">
          <div className="flex flex-col gap-1">
            <div className="inline-flex gap-2">
              <span className="text-xl font-light text-warmGray-600 w-48">
                IP Tunnel
              </span>
              <h1
                className={[
                  'text-xl ',
                  FABRIC?.loading
                    ? 'text-gray-500 font-normal'
                    : FABRIC?.detailTunnel?.ip_tunnel_block ===
                      'please deploy underlay first'
                    ? 'text-red-500 font-medium'
                    : 'font-bold text-warmGray-800',
                ].join(' ')}>
                :{' '}
                {FABRIC.loading
                  ? 'Loading ....'
                  : FABRIC?.detailTunnel?.ip_tunnel_block ?? ''}
              </h1>
            </div>
            <div className="inline-flex gap-2">
              <span className="text-xl font-light text-warmGray-600 w-48">
                Underlay Digunakan
              </span>
              <h1
                className={[
                  'text-xl ',
                  FABRIC?.loading
                    ? 'text-gray-500 font-normal'
                    : FABRIC?.detailTunnel?.underlay_used ===
                      'please deploy underlay first'
                    ? 'text-red-500 font-medium'
                    : 'font-bold text-warmGray-800',
                ].join(' ')}>
                :{' '}
                {!FABRIC.loading
                  ? FABRIC?.detailTunnel?.underlay_used ?? ''
                  : 'Loading ....'}
              </h1>
            </div>
            <div className="inline-flex gap-2">
              <span className="text-xl font-light text-warmGray-600 w-48">
                Underlay Tersedia
              </span>
              <h1
                className={[
                  'text-xl ',
                  FABRIC?.loading
                    ? 'text-gray-500 font-normal'
                    : FABRIC?.detailTunnel?.underlay_available ===
                      'please deploy underlay first'
                    ? 'text-red-500 font-medium'
                    : 'font-bold text-warmGray-800',
                ].join(' ')}>
                :{' '}
                {!FABRIC.loading
                  ? FABRIC?.detailTunnel?.underlay_available ?? ''
                  : 'Loading ....'}
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-8 relative">
          <h1 className="text-lg font-semibold text-warmGray-800">
            List Nodes
          </h1>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
            {FABRIC.loading ? (
              <div className="flex relative justify-center items-center w-full col-span-4">
                <LoadingIcon color="text-blue-500" height={7} width={7} />
              </div>
            ) : FABRIC.dataNodes.length > 0 ? (
              FABRIC.dataNodes.map((item) => (
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  key={item._id}
                  className="bg-white shadow-md rounded-lg p-4 group hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer">
                  <div className="flex flex-row-reverse justify-between px-2">
                    <span className="flex items-center justify-center h-12 w-12 rounded-md bg-warmGray-300 bg-opacity-10">
                      <ServerIcon
                        className="h-7 w-7 text-warmGray-800"
                        aria-hidden="true"
                      />
                    </span>
                    <div className="">
                      <h3 className="text-lg font-bold text-warmGray-700">
                        {item.routerName}
                      </h3>
                      <p className="mt-2 text-base font-light text-warmGray-500">
                        {item.management}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-6 px-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-warmGray-500">
                        BRIDGE
                      </span>
                      <span className="font-semibold text-lg text-warmGray-800">
                        {item.interfaceList.length}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-warmGray-500">
                        iBGP
                      </span>
                      <span className="font-semibold text-lg text-warmGray-800">
                        {item.interfaceList.length}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="relative flex justify-center items-center p-4 col-span-4">
                <p className="text-xl font-medium text-gray-800">
                  Belum Ada Node Ditambahkan!
                </p>
              </div>
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
}
