import "bulmaswatch/superhero/bulmaswatch.min.css";
import { Provider } from "react-redux";
import { Redirect } from "react-router-dom";
import { store } from "./redux";
import { useState, useEffect } from "react";
import axios from "axios";
import ShellList from "./components/shell-list";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import { baseUrl } from "./baseUrl";

interface User {
  email: string;
  userId: string;
}
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
        const { data } = await axios.get(`${baseUrl}/users/showMe`, {
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

  // const logoutUser = async () => {
  //   try {
  //     await axios.get(`${baseUrl}/auth/logout`);
  //     localStorage.removeItem("jsbook_token");
  //     removeUser();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route path="/login" exact>
              <Login saveUser={saveUser} user={user} />
            </Route>
            <Route path="/" exact>
              {!user && <Redirect to="/login"></Redirect>}
              <Home user={user} />
            </Route>
            <Route path="/editor/:filename" exact>
              {!user && <Redirect to="/login"></Redirect>}
              <ShellList />
            </Route>
            <Route path="*">
              <h1>hi</h1>
            </Route>
          </Switch>
          {isLoading && <h2>isLoading....</h2>}
        </Router>
      </div>
    </Provider>
  );
}
export default App;
