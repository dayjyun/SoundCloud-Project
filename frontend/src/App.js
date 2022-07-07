import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./components/Navigation";
import AllSongsLoader from "./components/Navigation/LoggedIn/AllSongsLibrary/AllSongsLoader";
import UserSongs from "./components/CurrentUser/UserSongs";
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
          <Route exact path='/'>
            <UserSongs />
          </Route>
          <Route path='/songs/:songId'>
            <h1>Placeholder for SongDetails component</h1>
          </Route>
          <Route path="/songs">
            <AllSongsLoader />
          </Route>
          <Route path='/albums/:albumId'>
            <h1>Placeholder for Albums edit component</h1>
          </Route>
          <Route path='/albums'>
            <h1>Placeholder for Albums component</h1>
          </Route>
          <Route path='/me'>
            <h1>Placeholder for Me Component</h1>
          </Route>
          <Route>
            <h1>404: No Media Is Found Here</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
