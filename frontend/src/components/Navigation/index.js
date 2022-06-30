import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "../ProfileButton/ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";
import HomeButton from "../HomeButton/HomeButton";
import SoundCloudText from "../SoundCloudText/SoundCloudText";
import Upload from "../UploadSongs/UploadSongs";
import SearchBar from "../SearchBar/SearchBar";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="loggedInNav">
          <SoundCloudText />
          <HomeButton />
          <SearchBar />
          <Upload />
          <ProfileButton user={sessionUser} />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div className="splash-nav">
          <div className="nav-session">
            <SoundCloudText />
            <LoginFormModal />
            <SignUpFormModal />
          </div>
        </div>
        <h2>Search Bar</h2>
        <h2>Text</h2>
      </>
    );
  }

  return <div className="sessionLinks">{isLoaded && sessionLinks}</div>;
}

export default Navigation;
