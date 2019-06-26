import styled from "styled-components";
import * as colors from "../../assets/styling";

export const HeaderTag = styled.header`
  a {
    text-decoration: none;
    color: ${colors.navLinks};
    font-size: 2.8rem;
    font-weight: bold;
    &:hover{
      color: ${colors.sadBlue};
    }
    @media (max-width: 760px){
        margin: 1rem;
      }
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${colors.HeaderBgColor};
    padding: 2rem;
    @media (max-width: 1250px){
        flex-direction: column;
      }
    section{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 50%;
      @media (max-width: 1250px){
        width: 100%;
      }
      @media (max-width: 760px){
        flex-direction: column;
      }
    }
  }
  h1 {
    font-family: "lobster", cursive;
    font-size: 4rem;
    letter-spacing: 0.2rem;
    color: ${colors.navLinks};
    margin: 0 1.8rem;
    @media (max-width: 1250px){
      font-size: 3.6rem;
      margin-bottom: 1rem;
      }
  }
  img{
    height: 6rem;
    margin-right: 1.25rem;
    @media (max-width: 760px){
        display: none;
      }
  }
  input{
    background-color: ${colors.navInput};
    border: 1px solid ${colors.navInputBorder};
    border-radius: 0.5rem;
    height: 3rem;
    width: 30rem;
    padding: 0.2rem 0.5rem;
    color: ${colors.navLinks};
    @media (max-width: 1250px){
      font-size: 3.6rem;
      margin-bottom: 1rem;
      }
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
