import React, { useState } from "react";
import * as sessionActions from "../../store/session";
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
      history.push("/");
    } else {
      setErrors(["Login failed"]);
    }

    return res;
  };

  const styleDisplay = {
    display: "inline-block"
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className="modalFrame">
        <div className="userLogin">
          <div className="enterIdentity init">
            {/* Username or Email */}
            <input
              type="text"
              placeholder="Your email address or username"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
          <div className="enterPassword init">
            {/* Password */}
            <input
              type="password"
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
        <div className="demo">
          <div className="line"></div>
          <div style={styleDisplay}>or</div>
          <div class="line"></div>
          <div className="demoText">
            <p>
              Afraid of commitment? <br />
              Try our demo user!
            </p>
          </div>
          <button>Demo User</button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
