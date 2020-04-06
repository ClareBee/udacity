import React from "react";
import { StyledFooter } from "./Styled";
function Footer() {
  return (
    <StyledFooter>
      &copy; ClareBee 2020 for Udacity ReactJS Nanodegree. Avatars provided by
      iconfield from the{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://thenounproject.com/iconfield/collection/avatar"
        title="Noun Project"
      >
        Noun Project
      </a>
    </StyledFooter>
  );
}

export default Footer;
