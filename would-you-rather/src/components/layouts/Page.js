import React from "react";
import styled from "styled-components";

const PageLayout = styled.main`
  flex: 1;
  margin: 1rem 2.5rem;
  background: ${props => props.theme.backgroundColor};
`;
const Page = props => {
  return <PageLayout>{props.children}</PageLayout>;
};

export default Page;
