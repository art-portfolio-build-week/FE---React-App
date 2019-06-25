import React from "react";
import { NavLink } from "react-router-dom";
import { HeaderTag, Button, BottomDiv } from "./css";
import userSVG from "../../assets/svg/user.svg";

export default function ({ token }) {
  return (
    <HeaderTag>
      <nav>
        <a href="#"><h1>Artista</h1></a>
        <input />
        <NavLink to="/">Galleries</NavLink>
        <NavLink to="/postart">AddForm</NavLink>
        <NavLink to="/register">Sign Up</NavLink>
        <NavLink to="/login">Log In</NavLink>
        <img src={userSVG} alt="user" />
      </nav>
      {!token && <BottomContent />}

    </HeaderTag>
  );
}

function BottomContent() {
  return (
    <BottomDiv>
      <div><h2>Gallery</h2></div>
      <div><Button type="button">Sign me up!</Button></div>
    </BottomDiv>
  );
}
