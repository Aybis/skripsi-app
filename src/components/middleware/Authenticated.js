import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

const Authenticated = ({
  component: Component,
  match,
  path,
  location,
  ...rest
}) => {
  const ok = Cookies.get('session');
  localStorage.removeItem('VMAT:redirect');
  console.log(ok);
  return (
    <Route
      {...rest}
      render={(props) =>
        ok ? (
          <Component {...props} />
        ) : path === '/' ? (
          <Redirect to={`/login?path=${location.pathname}`} />
        ) : (
          <Redirect to={`/login?path=${location.pathname}`} />
        )
      }
    />
  );
};

export default withRouter(Authenticated);
