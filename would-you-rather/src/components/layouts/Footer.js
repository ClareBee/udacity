import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background: ${(props) => props.theme.secondary};
  height: 1.5rem;
  padding: 1rem 2.5rem;
  color: ${(props) => props.theme.background};
`;

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
