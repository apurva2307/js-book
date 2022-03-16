import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !user ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);

export default AuthRoute;
