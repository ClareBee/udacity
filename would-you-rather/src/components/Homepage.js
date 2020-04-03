import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import QuestionList from "./QuestionList";

import Question from "./Question";
function Homepage() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Questions</h2>

      <Switch>
        <Route path={`${match.path}/:questionId`}>
          <Question />
        </Route>
        <Route path={match.path}>
          <QuestionList />
        </Route>
      </Switch>
    </div>
  );
}

export default Homepage;
