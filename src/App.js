import { createBrowserHistory } from 'history';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Router, Switch } from 'react-router-dom';
import Authenticated from './components/middleware/Authenticated';
import Gate from './components/middleware/Gate';
import AboutUs from './components/pages/AboutUs';
import Fabric from './components/pages/Fabric';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Ospf from './components/pages/Ospf';
import Vxlan from './components/pages/Vxlan';
import { getProfile } from './store/actions/user';
import jwt_decode from 'jwt-decode';
import AssociateBridge from './components/pages/AssociateBridge';

function App() {
  // fungsi dari redux untuk memasukkan sebuah nilai ke dalam variable yang di set pada redux pada file /types/user.js
  const dispatch = useDispatch();
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

  useEffect(() => {
    let session = null;
    if (localStorage.getItem('VMAT:user')) {
      session = JSON.parse(localStorage.getItem('VMAT:user'));
      // masukkan data user ke dalam redux user
      dispatch(getProfile(jwt_decode(session.token)));
    }
  }, [dispatch]);

  return (
    <Router history={history}>
      <Toaster />
      <Switch>
        <Gate path="/login" component={Login}></Gate>
        {/* Route After Middleware */}
        <Authenticated exact path="/" component={Home}></Authenticated>
        <Authenticated exact path="/fabric" component={Fabric}></Authenticated>
        <Authenticated exact path="/ibgp" component={Ospf}></Authenticated>
        <Authenticated exact path="/bridge" component={Vxlan}></Authenticated>
        <Authenticated
          exact
          path="/bridge/associate"
          component={AssociateBridge}></Authenticated>
        <Authenticated exact path="/us" component={AboutUs}></Authenticated>
      </Switch>
    </Router>
  );
}

export default App;
