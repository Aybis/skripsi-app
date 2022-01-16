import axios from '../axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // auth end point
  login: (credentials) => axios.post('auth/login', credentials),

  // fabric end point
  setUnderlay: (data) => axios.post('inventory/setupunderlay', data),
  checkUndelay: () => axios.get('inventory/check-underlay'),
  getUnderlay: () => axios.get('inventory/info-underlay'),
  getNodes: () => axios.get('inventory/router'),
  addNode: (data) => axios.post('inventory/', data),
  deleteNodes: (data) => axios.post('inventory/load-init', data),
  fetchListBridgeByFabric: (idNode) =>
    axios.get(`configure/member-vxlan-of-nodes/${idNode}`),
  getInterfaceNode: (data) => axios.get(`inventory/router/${data}`),

  // bridge domain end point
  getListBridgeDomain: () => axios.get('configure/bridgedomain'),
  addBridgeDomain: (data) =>
    axios.post('configure/create-new-bridge-domain', data),
  // params idBridge
  deleteBridgeDomain: (data) =>
    axios.post('configure/delete-bridge-domain', data),
  addNodeByBridgeDomain: (data) =>
    axios.post('configure/add-bridge-domain-member', data),
  deassociateNodeByBridgeDomain: (data) =>
    axios.post('configure/remove-bridge-domain-member', data),
  addInterfaceByBridgeDomain: (data) =>
    axios.post('configure/assoc-int-vxlan', data),
  listNodeByBridgeDomain: (idBridge) =>
    axios.get(`configure/member-of-bd/${idBridge}`),

  //   ospf end point
};
