import React from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";

// logged in
import SoundCloudText from "./SoundCloudText/SoundCloudText";
import HomeButton from "./LoggedIn/HomeButton/HomeButton";
import SearchBar from "./LoggedIn/SearchBar/SearchBar";
import AllSongsLibraryBtn from "./LoggedIn/LibraryButton/LibraryBtn";
import Upload from "./LoggedIn/UploadSongs/UploadSongs";
import ProfileButton from "./LoggedIn/ProfileButton/ProfileButton";
import Player from "./Player/Player";

// splash page
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    // logged in
    sessionLinks = (
      <>
        <div className="logged-in-nav">
          <SoundCloudText />
          <HomeButton />
          <AllSongsLibraryBtn />
          <SearchBar />
          <Upload />
          <ProfileButton user={sessionUser} />
        </div>
        <h1>Inside Profile</h1>
        <footer className="player-box">
          <Player />
        </footer>
      </>
    );
  } else {
    // splash page
    sessionLinks = (
      <>
        <div className="splash-nav">
          <div className="nav-right">
            <SoundCloudText />
          </div>
          <div className="nav-left">
            <LoginFormModal />
            <SignUpFormModal />
          </div>
        </div>
        <h1>Splash Page</h1>
        <h2>Banner</h2>
        <h2>Search Bar</h2>
      </>
    );
  }

  return <div>{isLoaded && sessionLinks}</div>;
}

export default Navigation;
