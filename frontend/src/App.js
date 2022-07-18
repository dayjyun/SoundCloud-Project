import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/sessionReducer";

import Navigation from "./components/Navigation";

import MediaLinks from "./components/Navigation/LoggedIn/MediaLinks/MediaLinks";
import UploadLinks from "./components/Navigation/LoggedIn/UploadLinks/UploadLinks";
import AllSongsLoader from "./components/Navigation/LoggedIn/AllSongsLibrary/AllSongsLoader";
import AllAlbumsLoader from "./components/Navigation/LoggedIn/AllAlbumsLibrary/AllAlbumsLoader";

import CreateAlbumComponent from "./components/Navigation/Album/CreateAlbum/CreateAlbumComponent";
import AlbumCard from "./components/Navigation/Album/AlbumCard/AlbumCard";
import AlbumDetails from "./components/Navigation/Album/AlbumDetails/AlbumDetails";

import CreateSongComponent from "./components/Navigation/Song/CreateSong/CreateSongComponent";
import SongCard from "./components/Navigation/Song/SongCard/SongCard";
import SongDetails from "./components/Navigation/Song/SongDetails/SongDetails";

import ErrorPage from "./components/Navigation/ErrorPage/ErrorPage";

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
