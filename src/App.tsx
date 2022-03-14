import "bulmaswatch/superhero/bulmaswatch.min.css";
import { Provider } from "react-redux";
import { store } from "./redux";
import { useState, useEffect } from "react";
import axios from "axios";
import ShellList from "./components/shell-list";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";

interface User {
  email: string;
  userId: string;
}
const baseUrl = "http://localhost:3001/api/v1";
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
      const token = localStorage.getItem("token");
      if (token) {
        const { data } = await axios.get(`${baseUrl}/users/showMe`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("fetchuser>", data);

        saveUser(data.user);
      }
    } catch (error) {
      removeUser();
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    try {
      await axios.get(`${baseUrl}/auth/logout`);
      localStorage.removeItem("token");
      removeUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <h1>HI hello</h1>
          </Route>
          <Route path="/login" exact>
            <Login saveUser={saveUser} user={user} />
          </Route>
          <Route path="/editor/:filename" exact>
            <ShellList />
          </Route>
          <Route path="*">
            <h1>hi</h1>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
