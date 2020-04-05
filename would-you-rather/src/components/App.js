import React, { useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import LogIn from "./pages/LogIn";
import HomePage from "./pages/HomePage";
import Leaderboard from "./pages/Leaderboard";
import NewQuestion from "./questions/NewQuestion";
import QuestionPage from "./pages/QuestionPage";
import NoMatch from "./pages/NoMatch";
import Nav from "./layouts/Nav";
import Footer from "./layouts/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Container = styled.div`
  color: ${props => props.theme.fontColor};
  border: 2px solid ${props => props.theme.main};
  font-family: ${props => props.theme.mainFont};
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  h1,
  h2,
  h3 {
    font-family: ${props => props.theme.headingFont};
  }
`;
function App({ dispatch, loading }) {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch, loading]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container>
          <Nav />
          <LoadingBar />
          {loading === true ? null : (
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/questions/:id" component={QuestionPage} />

              <Route path="/leaderboard" component={Leaderboard} />

              <Route path="/add" component={NewQuestion} />

              <Route path="/login" component={LogIn} />

              <Route component={NoMatch} />
            </Switch>
          )}
          <Footer />
        </Container>
      </ThemeProvider>
    </Router>
  );
}
function mapStateToProps({ users, authedUser }) {
  console.log("user?", authedUser);
  return {
    loading: users === null,
    authedUser
  };
}

export default connect(mapStateToProps)(App);
