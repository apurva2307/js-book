import "./styles/login.css";
import { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import FormRow from "../components/form-row";
import useLocalState from "../hooks/use-local-state";

import axios from "axios";
interface LoginProps {
  saveUser: (user: { email: string; userId: string }) => void;
  user: { email: string; userId: string } | null;
}
const Login: React.FC<LoginProps> = ({ saveUser, user }) => {
  // @ts-ignore
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  console.log({ user });
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
      const { data } = await axios.post(
        `https://common-api.apurvasingh.dev/api/v1/auth/login`,
        loginUser
      );
      console.log({ data });
      setValues({ email: "", password: "" });
      showAlert({
        text: `Welcome, ${data.user.name}. Redirecting to dashboard...`,
        type: "success",
      });
      setLoading(false);
      saveUser(data.user);
      history.push("/dashboard");
    } catch (error: any) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
  };

  return (
    <>
      {user && <Redirect to="/"></Redirect>}
      <section className="page">
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>{alert.text}</div>
        )}
        <form
          className={loading ? "form form-loading" : "form"}
          // @ts-ignore
          onSubmit={onSubmit}
        >
          {/* single form row */}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          {/* single form row */}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          <button type="submit" className="btn btn-block" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
          <p>
            Don't have an account?
            <Link to="/register" className="register-link">
              Register
            </Link>
          </p>
          <p>
            Forgot your password?{" "}
            <Link to="/forgot-password" className="reset-link">
              Reset Password
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
