import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";
import "./Navigation.css";
import HomeButton from "./HomeButton";
import SoundCloudText from "./SoundCloudText";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <SoundCloudText />
        <HomeButton />
        <ProfileButton user={sessionUser} />
      </>
    );
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
    <div className="navBar">
      <div className="topLeft">
        <ul className="navLinksContent">
          {/* <li className="navLinks">
            <NavLink className={"homeBtn"} exact to="/">
              Home
            </NavLink>
          </li> */}
        </ul>
      </div>
      <div className="sessionLinks">{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
