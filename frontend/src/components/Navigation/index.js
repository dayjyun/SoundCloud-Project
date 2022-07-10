import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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
import Banner from "./Banner/Banner";

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
          <div className="logged-in-right">
            <Upload />
            <ProfileButton user={sessionUser} />
          </div>
        </div>
        <div className="media-navLinks">
          <div>
            <NavLink className="media song-navLink" to="/songs">
              Songs
            </NavLink>
          </div>
          <div>
            <NavLink className="media album-navLink" to="/albums">
              Albums
            </NavLink>
          </div>
        </div>
        <div className="player-box">
          <Player />
        </div>
      </>
    );
  } else {
    // splash page
    sessionLinks = (
      <>
        <div>
          <div className="banner-component">
            {/* <Banner /> */}
            <div className="splash-nav">
              <div className="splash-nav-left">
                <SoundCloudText />
              </div>
              <div className="splash-nav-right">
                <LoginFormModal />
                <SignUpFormModal />
              </div>
            </div>
          </div>
        </div>
        <div className="splash-search">
          <SearchBar />
        </div>
      </>
    );
  }

  return <div>{isLoaded && sessionLinks}</div>;
}

export default Navigation;

// extra text
