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
        <NavLink className='loginBtn' to="/login" >
          Log In
        </NavLink>
        <NavLink className='signupBtn' to="/signup" >
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
            <NavLink className='homeBtn' exact to="/" >
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
