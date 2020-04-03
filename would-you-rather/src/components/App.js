import React, { useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import Homepage from "./Homepage";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
import Nav from "./Nav";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App({ dispatch, loading }) {
  console.log("loading", loading);
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch, loading]);
  return (
    <Router>
      <div>
        <Nav />
        {loading === true ? null : (
          <Switch>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/new-question">
              <NewQuestion />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        )}
        <Footer />
      </div>
    </Router>
  );
}
function mapStateToProps({ authedUser }) {
  console.log("user?", authedUser);
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
