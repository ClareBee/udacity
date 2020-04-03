import React, { useEffect, useState } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import LogIn from "./pages/LogIn";
import HomePage from "./pages/HomePage";
import Leaderboard from "./pages/Leaderboard";
import NewQuestion from "./questions/NewQuestion";
import QuestionPage from "./pages/QuestionPage";
import NoMatch from "./pages/NoMatch";
import Nav from "./layouts/Nav";
import Footer from "./layouts/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App({ dispatch, loading }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("loading", loading);
  useEffect(() => {
    dispatch(handleInitialData());
    setIsLoggedIn(true);
  }, [dispatch, loading]);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("not logged in");
    }
  });
  return (
    <Router>
      {isLoggedIn ? (
        <div>
          <Nav />

          {loading === true ? null : (
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/questions/:id" component={QuestionPage} />

              <Route path="/leaderboard" component={Leaderboard} />

              <Route path="/add" component={NewQuestion} />
              <Route component={NoMatch} />
            </Switch>
          )}
          <Footer />
        </div>
      ) : (
        <>
          <Redirect to="/login" />
          <Route path="/login" component={LogIn} />
        </>
      )}
    </Router>
  );
}
function mapStateToProps({ authedUser }) {
  console.log("user?", authedUser);
  return {
    loading: authedUser === null,
    authedUser
  };
}

export default connect(mapStateToProps)(App);
