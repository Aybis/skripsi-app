import axios from '../axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // auth end point
  login: (credentials) => axios.post('auth/login', credentials),

  // fabric end point
  setUnderlay: (data) => axios.post('inventory/setupunderlay', data),
  checkUndelay: () => axios.get('/inventory/check-underlay'),
  getNodes: () => axios.get('inventory/router'),
  addNode: (data) => axios.post('inventory/', data),
  deleteNodes: (data) => axios.post('inventory/load-init', data),
  viewVxlanById: (data) =>
    axios.get(`/configure/member-vxlan-of-nodes/${data}`),

  // vxlan end point
  getListBridgeDomain: () => axios.get('configure/bridgedomain'),
  addBridgeDomain: (data) =>
    axios.post('configure/create-new-bridge-domain', data),
  associateBridgeDomain: (data) =>
    axios.post('configure/add-bridge-domain-member', data),
  listDomainBridge: (idBridge) =>
    axios.get(`configure/member-of-bd/${idBridge}`),

  //   ospf end point
};
