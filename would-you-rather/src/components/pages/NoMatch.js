import React from "react";
import Page from "../layouts/Page";
const NoMatch = ({ location }) => (
  <Page>
    <h3>
      404: No match for <code>{location.pathname}</code>
    </h3>
  </Page>
);

export default NoMatch;
