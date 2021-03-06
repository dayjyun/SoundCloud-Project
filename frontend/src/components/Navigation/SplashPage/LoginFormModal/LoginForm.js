import React, { useState } from "react";
import * as sessionActions from "../../../../store/sessionReducer";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const res = await dispatch(
      sessionActions.login({ credential, password })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    if (res) {
      history.push("/me");
    } else {
      setErrors(["Login failed"]);
    }

    return res;
  };

  const handleDemoUser = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    history.push("/me");
  };

  const styleDisplay = {
    display: "inline-block",
  };

  return (
    <>
      <div className="login-modal-container">
        <form onSubmit={handleSubmit}>
          <div className="login-modal-box">
            <div className="signIn-text">
              <p>Sign In to SoundCloud</p>
            </div>
            <div className="login-errors">
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
            <div className="login-init">
              <div className="login-input">
                <input
                  type="text"
                  className="init-credential"
                  placeholder="Username or email address"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </div>
              <div className="login-input">
                <input
                  type="password"
                  className="init-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="logInSubmit">
                <button className="logInBtn logInModal" type="submit">
                  Log In
                </button>
              </div>
            </div>
            <div className="divider">
              <div className="line"></div>
              <div style={styleDisplay}>or</div>
              <div className="line"></div>
            </div>
            <div className="demo">
              <div className="demoText">
                <p className="lp1">Afraid of commitment? </p>
                <p className="lp2">Try our Demo User!</p>
              </div>
              <div className="demoBtn">
                <button className="demoUser" type="submit"
                  onClick={handleDemoUser}>
                  Demo User
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
