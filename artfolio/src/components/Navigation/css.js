import styled from "styled-components";
import * as colors from "../../assets/styling";
import banner from "../../assets/images/galleryBanner.png"
export const HeaderTag = styled.header`
  a {
    text-decoration: none;
    color: ${colors.navLinks};
    font-size: 2.8rem;
    font-weight: bold;
    transition: 0.2s;
    &:hover{
      color: ${colors.sadBlue};
      transition: 0.2s;
    }
    @media (max-width: 760px){
        margin: 1rem;
      }
  }
  nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${colors.HeaderBgColor};
    padding: 2rem;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,0.5);
    z-index: 0;
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
  font-size: 2.2rem;
  font-weight: bold;
  padding: 2rem 3.5rem;
  margin: 1.5rem 0;
  border-radius: 1.5rem;
  cursor: pointer;
  &:hover{
    background-color: ${colors.headerButtonHover};
  }
`;

export const BottomDiv = styled.div`
  padding: 0 4.1rem;
  height: 27rem;
  background-image: url(${banner});
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  div {
    display: flex;
    align-items: flex-start;
    height: 50%;
    h2 {
      align-self: flex-end;
      margin-bottom: 2rem;
      font-size: 3.6rem;
      font-weight: bold;
      text-shadow: 0px 0px 6px #000000;
      color: white;
      font-family: "lato", sans-serif;
    }
  }
`;
