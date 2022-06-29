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
        <LoginFormModal />
        <SignUpFormModal />
      </>
    );
  }

  return (
    <div className="splashNavBar">
      <ul>
        <li className="navLinks">
          <NavLink className={'homeBtn'} exact to="/">
            Home
          </NavLink>
          <div className="sessionLinks">{isLoaded && sessionLinks}</div>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
