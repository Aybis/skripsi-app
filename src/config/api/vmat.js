import axios from '../axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // auth end point
  login: (credentials) => axios.post('auth/login', credentials),

  // fabric end point
  setUnderlay: (data) => axios.post('inventory/setupunderlay', data),
  checkUndelay: () => axios.get('inventory/check-underlay'),
  detailUnderlay: () => axios.get('inventory/info-underlay'),
  getNodes: () => axios.get('inventory/router'),
  addNode: (data) => axios.post('inventory/', data),
  deleteNodes: (data) => axios.post('inventory/load-init', data),
  fetchListBridgeByFabric: (idNode) =>
    axios.get(`configure/member-vxlan-of-nodes/${idNode}`),
  fetchListIBGPByFabric: (id) => axios.get(`/configure/ibgp-list/${id}`),
  getInterfaceNode: (data) => axios.get(`inventory/router/${data}`),

  // bridge domain end point
  getListBridgeDomain: () => axios.get('configure/bridgedomain'),
  addBridgeDomain: (data) =>
    axios.post('configure/create-new-bridge-domain', data),
  // params idBridge
  deleteBridgeDomain: (data) =>
    axios.post('configure/delete-bridge-domain', data),

  // endpoint asso and deasso node bridge
  listNodeByBridgeDomain: (idBridge) =>
    axios.get(`configure/member-of-bd/${idBridge}`),
  addNodeByBridgeDomain: (data) =>
    axios.post('configure/add-bridge-domain-member', data),
  deassociateNodeByBridgeDomain: (data) =>
    axios.post('configure/remove-bridge-domain-member', data),

  // endpoint asso and deasso interface
  addInterfaceByBridgeDomain: (data) =>
    axios.post('configure/assoc-int-vxlan', data),
  deleteInterfaceByBridgeDomain: (data) =>
    axios.post('configure/deassoc-int-vxlan', data),

  //   ibgp end point
  listIbgp: () => axios.get('configure/ibgp-list'),
  addIbgp: (data) => axios.post('configure/ibgp-add-address', data),
  deleteIbgp: (data) => axios.post('configure/ibgp-remove-address', data),
};
