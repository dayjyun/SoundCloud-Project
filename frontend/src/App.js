import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./components/Navigation";
import MediaLinks from "./components/Navigation/LoggedIn/MediaLinks/MediaLinks";
import AllSongsLoader from "./components/Navigation/LoggedIn/AllSongsLibrary/AllSongsLoader";
import AllAlbumsLoader from "./components/Navigation/LoggedIn/AllAlbumsLibrary/AllAlbumsLoader";
import CurrentSong from "./components/CurrentUser/CurrentSong/CurrentSong";
import CurrentAlbum from "./components/CurrentUser/CurrentAlbum/CurrentAlbum";
import SongDetails from "./components/CurrentUser/SongDetails/SongDetails";
import AlbumDetails from "./components/CurrentUser/AlbumDetails/AlbumDetails";
import CreateAlbumComponent from "./components/CurrentUser/CreateAlbum/CreateAlbumComponent";
import CreateSongComponent from "./components/CurrentUser/CreateSong/CreateSongComponent";
import UploadLinks from "./components/Navigation/LoggedIn/UploadLinks/UploadLinks";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import SplashPage from "./components/Navigation/SplashPage/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/songs/:songId">
            <SongDetails />
          </Route>

          <Route exact path="/songs">
            <MediaLinks />
            <AllSongsLoader />
          </Route>

          <Route exact path="/albums/:albumId">
            <AlbumDetails />
          </Route>

          <Route exact path="/albums">
            <MediaLinks />
            <AllAlbumsLoader />
          </Route>

          <Route exact path="/me/albums">
            <UploadLinks />
            <CreateAlbumComponent />
          </Route>

          <Route exact path="/me/songs">
            <UploadLinks />
            <CreateSongComponent />
          </Route>

          <Route exact path="/me">
            <CurrentSong />
            <CurrentAlbum />
          </Route>

          {/* <Route exact path="/">
            <SplashPage />
          </Route> */}

          <Route>{sessionUser && <ErrorPage />}</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
