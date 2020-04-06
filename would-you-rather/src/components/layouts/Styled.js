import styled from "styled-components";

// SHARED ========================================
export const HeadingOne = styled.h1`
  font-weight: bold;
  letter-spacing: 1.5px;
`;
export const HeadingTwo = styled.h2`
  font-weight: bold;
  letter-spacing: 1.5px;
  font-size: 1.25rem;
`;

export const Error = styled.div`
  padding: 1.5rem 0rem;
  width: 100%;
  color: ${(props) => props.theme.redColor};
  font-weight: bold;
  font-size: 1.25rem;
`;

export const Button = styled.button`
  background: ${(props) => props.theme.redColor};
  padding: 1rem 1.5rem;
  border-radius: 5px;
  font-size: 1.25rem;
  color: ${(props) => props.theme.whiteColor};
  cursor: pointer;
  :disabled {
    color: #cdcdcd;
  }
`;

export const StyledForm = styled.form`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  input {
    height: 2rem;
    font-size: 1.25rem;
    color: ${(props) => props.theme.fontColor};
    border: none;
    border-radius: 3px;
    margin: 1rem 0rem;
    padding: 0.25rem;
  }
  @media only screen and (max-width: 400px) {
    width: 100%;
  }
`;

export const FormControl = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: space-around;
  border: solid 5px ${(props) => props.theme.secondary};
  border-radius: 3px;
  background: ${(props) => props.theme.whiteColor};
`;

// LAYOUT ===========================================
export const Container = styled.div`
  color: ${(props) => props.theme.fontColor};
  border: 2px solid ${(props) => props.theme.main};
  border-radius: 3px;
  font-family: ${(props) => props.theme.mainFont};
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  h1,
  h2,
  h3 {
    font-family: ${(props) => props.theme.headingFont};
  }
`;

export const NavBar = styled.nav`
  border: 2px solid ${(props) => props.theme.secondary};
  border-radius: 3px;
  background: ${(props) => props.theme.main};

  ul {
    list-style: none;
    padding-inline-start: 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    font-size: 1.25rem;
  }
  li {
    margin: 1rem 2.5rem;
  }
  a,
  h3 {
    color: ${(props) => props.theme.whiteColor};
  }
  a {
    width: 100%;
    padding: 1rem 1.5rem;
    border-radius: 3px;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
  }
  a:hover {
    border: 1px solid ${(props) => props.theme.background};
  }
`;

export const StyledFooter = styled.footer`
  background: ${(props) => props.theme.secondary};
  height: 1.5rem;
  padding: 1rem 2.5rem;
  color: ${(props) => props.theme.background};
`;

export const Bar = styled.div`
  width: 100%;
  height: 25px;
  border: solid 2px black;
  border-radius: 3px;
`;

// HOMEPAGE ===========================================

export const Name = styled.div`
  font-size: 1.5rem;
  margin-top: 2rem;
`;

export const Tab = styled.div`
  display: inline-block;
  padding: 1rem 1.5rem;
  font-size: 1.25rem;
  border: 3px solid ${(props) => props.theme.main};
  background: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: pointer;
  @media only screen and (max-width: 400px) {
    font-size: 0.8rem;
    padding: 1rem;
  }
`;

// QUESTION PAGES =====================================

export const Questions = styled.div`
  padding: 2rem 1rem 1rem;
`;

export const QuestionCard = styled.div`
  background: ${(props) => props.theme.whiteColor};
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 3px;
  display: flex;
  flex-flow: row wrap;
`;

export const HighlightedName = styled.span`
  color: ${(props) => props.theme.redColor};
  font-weight: bold;
`;

export const QuestionContainer = styled.div`
  padding: 1rem 2.5rem;
  @media only screen and (max-width: 400px) {
    padding: 0;
  }
`;

export const Results = styled.div`
  background: ${(props) => props.theme.whiteColor};
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 3px;
`;

export const ResultsBody = styled.div`
  margin: 0 auto;
  width: 75%;
`;
