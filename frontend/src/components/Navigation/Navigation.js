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
        <NavLink className="signInBtn button" to="/login">
          Sign In
        </NavLink>
        <NavLink className="signUpBtn button" to="/signup">
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <nav>
      <div className="session" >
        <div className="homeLink">
          <NavLink className="homeBtn button" exact to="/">
            Home
          </NavLink>
        </div>
        <div className="searchBar">
          <input
            className="search-input"
            type="text"
            placeholder="Search for artists, albums, and songs"
          />
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
