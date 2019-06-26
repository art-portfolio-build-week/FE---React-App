import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as colors from "../../../assets/styling";
import banner from "../../../assets/images/galleryBanner.png";

const Button = styled.button`
  background-color: ${colors.headerButton};
  border: none;
  font-size: 2.2rem;
  font-weight: bold;
  padding: 2rem 3.5rem;
  margin: 1.5rem 0;
  border-radius: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.headerButtonHover};
  }
`;

const BottomDiv = styled.div`
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


export default function BottomContent() {
  return (
    <BottomDiv>
      <div><h2>Welcome to Artista! Lets us show off your work!</h2></div>
      <div><Link to="/register"><Button type="button">Sign me up!</Button></Link></div>
    </BottomDiv>
  );
}
