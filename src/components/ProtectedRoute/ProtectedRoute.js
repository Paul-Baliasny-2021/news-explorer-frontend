import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({ isSignedIn, children, ...props }) => {

  return (
    <Route {...props}>
      {isSignedIn ? children : <Redirect to='/' />}
    </Route>
  );
};
export default ProtectedRoute;
