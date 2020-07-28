import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/user";

export default function PrivateRoute({ children, ...rest }) {
  const { user } = React.useContext(UserContext);

  return (
    <Route
      {...rest}
      render={() => {
        return user.token ? children : <Redirect to="/login"></Redirect>;
      }}
    ></Route>
  );
}

/* <Route exact path='/u/:username/' component={ProfileComponent} />
<Route exact path='/u/:username/' render={() => <ProfileComponent />} /> */

// You generally use the render prop when you need some data from the component that contains your routes, since the component prop gives no real way of passing in additional props to the component.
