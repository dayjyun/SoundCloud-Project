import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink className="loginBtn button" to="/login">
          Log In
        </NavLink>
        <NavLink className="signupBtn button" to="/signup">
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <nav>
      <div className="session">
        <div className="homeLink">
          <NavLink className="homeBtn button" exact to="/">
            Home
          </NavLink>
        </div>
        <ul>
          <li>
            <div>{isLoaded && sessionLinks}</div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
