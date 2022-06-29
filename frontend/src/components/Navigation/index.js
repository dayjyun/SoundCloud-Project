import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <li className="loginFormModal">
          <LoginFormModal />
        </li>
        <li className="signUpFormModal">
          <SignUpFormModal />
        </li>
      </>
    );
  }

  return (
    <div className="splashNavBar">
      <ul className="navLinksContent">
        <li className="navLinks">
          <NavLink className={"homeBtn"} exact to="/">
            Home
          </NavLink>
        </li>
      </ul>
      <div className="sessionLinks">{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
