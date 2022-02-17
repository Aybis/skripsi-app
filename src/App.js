import { createBrowserHistory } from 'history';
import { Toaster } from 'react-hot-toast';
import { Router, Switch } from 'react-router-dom';
import Authenticated from './components/middleware/Authenticated';
import Gate from './components/middleware/Gate';
import AboutUs from './components/pages/AboutUs';
import AssociateBridge from './components/pages/AssociateBridge';
import Bridge from './components/pages/Bridge';
import Fabric from './components/pages/Fabric';
import Home from './components/pages/Home';
import IBGP from './components/pages/IBGP';
import Login from './components/pages/Login';

function App() {
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

  return (
    <Router history={history}>
      <Toaster />
      <Switch>
        <Gate path="/login" component={Login}></Gate>
        {/* Route After Middleware */}
        <Authenticated exact path="/" component={Home}></Authenticated>
        <Authenticated exact path="/fabric" component={Fabric}></Authenticated>
        <Authenticated exact path="/ibgp" component={IBGP}></Authenticated>
        <Authenticated exact path="/bridge" component={Bridge}></Authenticated>
        <Authenticated
          exact
          path="/bridge/associate/:id"
          component={AssociateBridge}></Authenticated>
        <Authenticated exact path="/us" component={AboutUs}></Authenticated>
      </Switch>
    </Router>
  );
}

export default App;
