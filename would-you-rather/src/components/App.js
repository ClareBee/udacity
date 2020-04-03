import React, { useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import HomePage from "./pages/HomePage";
import Leaderboard from "./pages/Leaderboard";
import NewQuestion from "./questions/NewQuestion";
import QuestionPage from "./pages/QuestionPage";
import NoMatch from "./pages/NoMatch";
import Nav from "./layouts/Nav";
import Footer from "./layouts/Footer";
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
            <Route exact path="/" component={HomePage} />
            <Route path="/questions/:id" component={QuestionPage} />

            <Route path="/leaderboard" component={Leaderboard} />

            <Route path="/add" component={NewQuestion} />

            <Route component={NoMatch} />
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
