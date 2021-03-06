import "bulmaswatch/superhero/bulmaswatch.min.css";
import "./app.css";
import { Provider } from "react-redux";
import { store } from "./redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { LastLocationProvider } from "react-router-last-location";
import ShellList from "./components/shell-list";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import AuthRoute from "./components/auth-route";
import Navbar from "./components/navbar";
import Signup from "./components/signup";

interface User {
  email: string;
  userId: string;
}
axios.defaults.baseURL = "https://common-api.apurvasingh.dev/api/v1";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const saveUser = (user: User): void => {
    // @ts-ignore
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("jsbook_token");
      if (token) {
        const { data } = await axios.get(`/users/showMe`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        saveUser(data.user);
      }
    } catch (error) {
      removeUser();
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    try {
      await axios.get(`/auth/logout`);
      localStorage.removeItem("jsbook_token");
      removeUser();
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Provider store={store}>
      <div className="main">
        <Router>
          <LastLocationProvider>
            <Navbar logoutUser={logoutUser} user={user} />
            {!isLoading && (
              <Switch>
                <Route path="/login" exact>
                  <Login saveUser={saveUser} user={user} />
                </Route>
                <Route path="/signup" exact>
                  <Signup saveUser={saveUser} user={user} />
                </Route>
                <AuthRoute
                  exact
                  path="/editor/:filename"
                  user={user}
                  component={ShellList}
                />
                <AuthRoute exact path="/" user={user} component={Home} />
                <Route path="*">
                  <h1>No page found.</h1>
                </Route>
              </Switch>
            )}
          </LastLocationProvider>
        </Router>
        {isLoading && <div className="spinner-7"></div>}
      </div>
    </Provider>
  );
}
export default App;
