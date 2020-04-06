import styled from "styled-components";

export const HeadingOne = styled.h1`
  font-weight: bold;
  letter-spacing: 1.5px;
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
`;

export const FormControl = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
