import React from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import Leaderboard from "./components/Leaderboard";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
