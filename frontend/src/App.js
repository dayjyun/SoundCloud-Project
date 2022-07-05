import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
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
          <Route path="/songs">
            <AllSongsLoader />
          </Route>
          <Route path='/me'>
            <h1>Me component holder</h1>
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
