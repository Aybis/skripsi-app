import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router-dom';
import Authenticated from './components/middleware/Authenticated';
import Gate from './components/middleware/Gate';
import Login from './components/pages/Login';
import Index from './route/Index';

function App() {
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

  return (
    <>
      <Router history={history}>
        <Switch>
          <Gate path="/login" component={Login}></Gate>
          {/* Route After Middleware */}
          <Authenticated exact path="/" component={Index}></Authenticated>
        </Switch>
      </Router>
    </>
  );
}

export default App;
