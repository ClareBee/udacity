import React from "react";
import Page from "../layouts/Page";
import { Error } from "../layouts/Styled";
const NoMatch = ({ location }) => (
  <Page>
    <Error>404: {location.state ? location.state.message : "not found"}</Error>
  </Page>
);

export default NoMatch;
