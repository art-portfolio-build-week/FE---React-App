import styled from "styled-components";
import * as colors from "../../assets/styling";

export const HeaderTag = styled.header`
  a {
    text-decoration: none;
    color: ${colors.navLinks};
    font-size: 1.8rem;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    &:hover{
      color: ${colors.sadBlue};
    }
  }
  nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: ${colors.HeaderBgColor};
    height: 6.6rem;
  }
  h1 {
    font-family: "lobster", cursive;
    font-size: 3.6rem;
    color: ${colors.navLinks};
    margin: 0 1.8rem;
  }
  img{
    height: 4.6rem;
    margin-right: 1.25rem;
  }
  input{
    background-color: ${colors.navInput};
    border: 1px solid ${colors.navInputBorder};
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    color: ${colors.navLinks}
  }
`;

export const Button = styled.button`
  background-color: ${colors.headerButton};
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1.2rem 2rem;
  margin: 1.5rem 0;
  &:hover{
    background-color: ${colors.headerButtonHover};
  }
`;

export const BottomDiv = styled.div`
  padding: 0 4.1rem;
  height: 18.5rem;
  background-color: ${colors.sadBlue};
  div {
    display: flex;
    align-items: flex-start;
    height: 50%;
    h2 {
      align-self: flex-end;
      margin-bottom: 2rem;
      font-size: 2.6rem;
      color: ${colors.navLinks};
    }
  }
`;
