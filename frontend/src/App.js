import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./components/Navigation";
import MediaLinks from "./components/Navigation/LoggedIn/Media/MediaLinks";
import AllSongsLoader from "./components/Navigation/LoggedIn/AllSongsLibrary/AllSongsLoader";
import AllAlbumsLoader from "./components/Navigation/LoggedIn/AllAlbumsLibrary/AllAlbumsLoader";
import CurrentSong from "./components/CurrentUser/CurrentSong/CurrentSong";
// import SongDetails from "./components/CurrentUser/SongDetails/SongDetails";
import CurrentAlbum from "./components/CurrentUser/CurrentAlbum/CurrentAlbum";
import SongDetails from "./components/CurrentUser/SongDetails/SongDetails";
import AlbumDetails from "./components/CurrentUser/AlbumDetails/AlbumDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/songs/:songId">
            <SongDetails/>
          </Route>
          <Route exact path="/songs">
            <MediaLinks />
            <AllSongsLoader />
          </Route>
          <Route path="/albums/:albumId">
            <AlbumDetails />
          </Route>
          <Route path="/albums">
            <MediaLinks />
            <AllAlbumsLoader />
          </Route>
          <Route path="/me">
            <CurrentSong />
            <CurrentAlbum />
          </Route>
          <Route>
            <h1>404: Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
