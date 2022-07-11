import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./components/Navigation";
import MediaLinks from "./components/Navigation/LoggedIn/Media/MediaLinks";
import AllSongsLoader from "./components/Navigation/LoggedIn/AllSongsLibrary/AllSongsLoader";
import AllAlbumsLoader from "./components/Navigation/LoggedIn/AllAlbumsLibrary/AllAlbumsLoader";
import CurrentSong from "./components/CurrentUser/CurrentSong/CurrentSong";
import EditCurrentSong from "./components/CurrentUser/CurrentSong/EditSong/EditSong";
// import Library from "./components/Navigation/LoggedIn/AllSongsLibrary";
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
            <h1>Placeholder for SongDetails component: App.js</h1>
            <h1>Edit</h1>
            <h1>Delete</h1>
            <EditCurrentSong />
          </Route>
          <Route exact path="/songs">
            <MediaLinks />
            <AllSongsLoader />
          </Route>
          <Route path="/albums/:albumId">
            <h1>Placeholder for Albums edit component: App.js</h1>
            <h1>Edit</h1>
            <h1>Delete</h1>
          </Route>
          <Route path="/albums">
            <MediaLinks />
            <AllAlbumsLoader />
          </Route>
          <Route path="/me">
            <CurrentSong />
          </Route>
          {/* <Route>
            <h1>404: No Media Is Found Here</h1>
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
