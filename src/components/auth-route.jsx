import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, user, setIsLoading, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !user ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} setIsLoading={setIsLoading} />
      )
    }
  />
);

export default AuthRoute;
