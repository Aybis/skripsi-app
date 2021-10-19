import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../components/includes/Layout';
import AboutUs from '../components/pages/AboutUs';
import Fabric from '../components/pages/Fabric';
import Home from '../components/pages/Home';
import Ospf from '../components/pages/Ospf';
import Vxlan from '../components/pages/Vxlan';

function Index() {
  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/fabric">
              <Fabric />
            </Route>
            <Route exact path="/ospf">
              <Ospf />
            </Route>
            <Route exact path="/vxlan">
              <Vxlan />
            </Route>
            <Route exact path="/us">
              <AboutUs />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </>
  );
}

export default Index;
