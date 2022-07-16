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
        <div className="player-box">
          <Player />
        </div>
      </>
    );
  } else {
    // splash page
    sessionLinks = (
      <>
      <SplashPage />
        {/* <div>
          <div className="splash-top">
            <div className="background-image-one">
              <div className="splash-nav">
                <div className="splash-nav-left">
                  <SoundCloudText />
                </div>
                <div className="splash-nav-right">
                  <LoginFormModal />
                  <SignUpFormModal />
                </div>
              </div>
              <div className="text-div">
                <h1 className="background-image-one-text">
                  Welcome To SoundCloud
                </h1>
              </div>
            </div>
          </div>
          <div>
            <SplashPage />
          </div>
          <div className="closer">
            <div className="splash-signup-button-bottom">
              <SignUpFormModal />
            </div>
            <div className="splash-login">
              <div>
                <p className="splash-login-text">Already have an account?</p>
              </div>
              <div>
                <LoginFormModal />
              </div>
            </div>
          </div>
        </div> */}
      </>
    );
  }

  return <div>{isLoaded && sessionLinks}</div>;
}

export default Navigation;
