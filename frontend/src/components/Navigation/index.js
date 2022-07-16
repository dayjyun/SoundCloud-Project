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
import SplashPage from "./SplashPage/SplashPage";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
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
        <div className="player-box">
          <Player />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <SplashPage />
      </>
    );
  }

  return <div>{isLoaded && sessionLinks}</div>;
}

export default Navigation;
