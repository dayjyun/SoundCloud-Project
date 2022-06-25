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
        <NavLink to="/login" activeStyle={{ fontWeight: "bold" }}>
          Log In
        </NavLink>
        <NavLink to="/signup" activeStyle={{ fontWeight: "bold" }}>
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <nav>
      <div>
        <ul>
          <li className="session">
            <NavLink exact to="/" activeStyle={{ fontWeight: "bold" }}>
              Home
            </NavLink>
            {isLoaded && sessionLinks}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
