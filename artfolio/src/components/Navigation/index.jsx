import React from "react";
import { NavLink } from "react-router-dom";
import { HeaderTag, Button, BottomDiv } from "./css";
import userSVG from "../../assets/svg/user.svg";

export default function ({ token, loggedUser }) {
  return (
    <HeaderTag>
      <nav>
        <a href="google.com"><h1>Artista</h1></a>
        <input /> 
        <section>
          <NavLink to="/">Galleries</NavLink>
          <NavLink to="/postart">Add A New Post</NavLink>
          {token ? (
            <NavLink to="#">{loggedUser}</NavLink>
          ) : (
            <React.Fragment>
              <NavLink to="/register">Sign Up</NavLink>
              <NavLink to="/login">Log In</NavLink>
            </React.Fragment>
          )
          }
          <img src={userSVG} alt="user" />
        </section>
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
