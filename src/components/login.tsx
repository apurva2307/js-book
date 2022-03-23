import "./styles/login.css";
import { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import FormRow from "../components/form-row";
import useLocalState from "../hooks/use-local-state";
import axios from "axios";
import { useLastLocation } from "react-router-last-location";

interface LoginProps {
  saveUser: (user: { email: string; userId: string }) => void;
  user: { email: string; userId: string } | null;
}
const Login: React.FC<LoginProps> = ({ saveUser, user }) => {
  // @ts-ignore
  const lastLocation = useLastLocation();
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

  const handleChange = (e: Event) => {
    // @ts-ignore
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e: Event) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);
    const { email, password } = values;
    const loginUser = { email, password };
    try {
      const { data } = await axios.post("/auth/login", loginUser);
      localStorage.setItem("jsbook_token", data.token);
      setValues({ email: "", password: "" });
      showAlert({
        text: `Welcome, ${data.user.name}. Redirecting to dashboard...`,
        type: "success",
      });
      setLoading(false);
      saveUser(data.user);
      // window.location.href = "/"
      history.push("/");
    } catch (error: any) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
  };
  // if (user) {
  //   // @ts-ignore
  //   window.location.href = lastLocation.pathname
  // }
  // console.log(user)
  return (
    <>
      {user && lastLocation && <Redirect to={lastLocation.pathname} />}
      {user && <Redirect to="/" />}
      <section className="page">
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>{alert.text}</div>
        )}
        <form
          className={loading ? "form form-loading" : "form"}
          // @ts-ignore
          onSubmit={onSubmit}
        >
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          <button
            type="submit"
            className="button is-small is-primary"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <p style={{ color: "var(--primary-900)" }}>
            Don't have an account?
            <Link to="/signup" className="register-link">
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
