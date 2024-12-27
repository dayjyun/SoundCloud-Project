import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/sessionReducer";

import Navigation from "./components";

import MediaLinks from "./components/LoggedIn/MediaLinks/MediaLinks";
import UploadLinks from "./components/LoggedIn/UploadLinks/UploadLinks";
import AllSongsLoader from "./components/LoggedIn/AllSongsLibrary/AllSongsLoader";
import AllAlbumsLoader from "./components/LoggedIn/AllAlbumsLibrary/AllAlbumsLoader";

import CreateAlbumComponent from "./components/Album/CreateAlbum/CreateAlbumComponent";
import AlbumCard from "./components/Album/AlbumCard/AlbumCard";
import AlbumDetails from "./components/Album/AlbumDetails/AlbumDetails";

import CreateSongComponent from "./components/Song/CreateSong/CreateSongComponent";
import SongCard from "./components/Song/SongCard/SongCard";
import SongDetails from "./components/Song/SongDetails/SongDetails";

import ErrorPage from "./components/ErrorPage/ErrorPage";

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
            <SongCard />
            <AlbumCard />
          </Route>
          <Route>{sessionUser && <ErrorPage />}</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
