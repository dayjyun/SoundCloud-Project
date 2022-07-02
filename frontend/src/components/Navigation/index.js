import React from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";

// logged in
import SoundCloudText from "./SoundCloudText/SoundCloudText";
import HomeButton from "./HomeButton/HomeButton";
import SearchBar from "./SearchBar/SearchBar";
import AllSongsLibraryBtn from "./LibraryButton/LibraryBtn";
import Upload from "./UploadSongs/UploadSongs";
import ProfileButton from "./ProfileButton/ProfileButton";

// splash page
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) { // logged in
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
      </>
    );
  } else { // splash page
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
        <h2>Search Bar</h2>
        <h2>Songs</h2>
      </>
    );
  }

  return <div>{isLoaded && sessionLinks}</div>;
}

export default Navigation;
