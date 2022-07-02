import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "../ProfileButton/ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";
import HomeButton from "../HomeButton/HomeButton";
import SoundCloudText from "../SoundCloudText/SoundCloudText";
import Upload from "../UploadSongs/UploadSongs";
import SearchBar from "../SearchBar/SearchBar";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="logged-in-nav">
          <SoundCloudText />
          <HomeButton />
          <SearchBar />
          <Upload />
          <ProfileButton user={sessionUser} />
        </div>
        <h1>Inside Profile</h1>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div className="nav-session">
          <div className="nav-right">
            <SoundCloudText />
          </div>
          <div className="nav-left">
            <LoginFormModal />
            <SignUpFormModal />
          </div>
        </div>
        <h2>Search Bar</h2>
        <h2>Songs</h2>
      </>
    );
  }

  return <div>{isLoaded && sessionLinks}</div>;
}

export default Navigation;
