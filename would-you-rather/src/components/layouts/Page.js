import React from "react";
import styled from "styled-components";

const PageLayout = styled.main`
  flex: 1;
  margin: 1rem auto;
  width: 60%;
  background: ${(props) => props.theme.background};
  padding: 1rem 2.5rem;
`;
const Page = (props) => {
  return <PageLayout>{props.children}</PageLayout>;
};

export default Page;
