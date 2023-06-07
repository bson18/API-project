import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotTiles from "./components/Spot/SpotTiles";
import SpotDetails from "./components/Spot/SpotDetails";
import CreateSpot from "./components/Spot/CreateSpot";
import ManageSpot from "./components/Spot/ManageSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/'>
            <SpotTiles />
          </Route>
          <Route path='/spots/new'>
            <CreateSpot />
          </Route>
          <Route exact path='/spots/current'>
            <ManageSpot />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotDetails />
          </Route>
        </Switch>}
    </>
  );
}

export default App;
