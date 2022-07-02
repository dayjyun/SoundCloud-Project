import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css";

// logged in
import SoundCloudText from "./SoundCloudText/SoundCloudText";
import HomeButton from "./HomeButton/HomeButton";
import AllSongs from './AllSongs/index.js'
import SearchBar from "./SearchBar/SearchBar";
import Upload from "./UploadSongs/UploadSongs";
import ProfileButton from "./ProfileButton/ProfileButton";

// splash page
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";

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
          <AllSongs />
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
