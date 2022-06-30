import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "../ProfileButton/ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";
import HomeButton from "../HomeButton/HomeButton";
import "./Navigation.css";
import SoundCloudText from "../SoundCloudText/SoundCloudText";
import Upload from "../UploadSongs/UploadSongs";
import SearchBar from "../SearchBar/SearchBar";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="navBar">
        <SoundCloudText />
        <HomeButton />
        <SearchBar />
        <Upload />
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className="navBar">
        <SoundCloudText />
        <LoginFormModal />
        <SignUpFormModal />
      </div>
    );
  }

  return (

      <div className="sessionLinks">{isLoaded && sessionLinks}</div>

  );
}

export default Navigation;
