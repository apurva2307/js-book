import "./styles/login.css";
import { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import FormRow from "./form-row";
import useLocalState from "../hooks/use-local-state";
import axios from "axios";
import { useLastLocation } from 'react-router-last-location';

interface SignupProps {
  saveUser: (user: { email: string; userId: string }) => void;
  user: { email: string; userId: string } | null;
}
const Signup: React.FC<SignupProps> = ({ saveUser, user }) => {
  // @ts-ignore
  const lastLocation = useLastLocation();
  const history = useHistory()
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
    const registerUser = { email, password };
    try {
      const { data } = await axios.post("/auth/register", registerUser);
      localStorage.setItem("jsbook_token", data.token);
      setValues({ email: "", password: "" });
      if (data.user) {
        showAlert({
          text: `Welcome, ${data.user.email}. Redirecting to dashboard...`,
          type: "success",
        });
        saveUser(data.user);
      } else if (data.msg) {
        showAlert({ text: data.msg });
      }
      setLoading(false);
      history.push("/")
    } catch (error: any) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
  };
  
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
          <button type="submit" className="button is-small is-primary" disabled={loading}>
            {loading ? "Loading..." : "Sign UP"}
          </button>
          <p style={{color: "var(--primary-900)"}}>
            Already have an account?
            <Link to="/login" className="register-link">
              Login
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Signup;
