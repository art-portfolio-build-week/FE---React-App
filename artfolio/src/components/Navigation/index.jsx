import React from "react";
import pt from "prop-types";
import { NavLink } from "react-router-dom";
import { HeaderTag, Button, BottomDiv } from "./css";
import userSVG from "../../assets/svg/user.svg";

export default function Header({ token, loggedUser }) {
  return (
    <HeaderTag>
      <nav>
        <a href="google.com"><h1>Artista</h1></a>
        <input type="text" name="search-query" />
        <section>
          <NavLink exact to="/">Galleries</NavLink>
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
      <div><h2>Welcome to Artista! Lets us show off your work!</h2></div>
      <div><NavLink to="/register"><Button type="button">Sign me up!</Button></NavLink></div>
    </BottomDiv>
  );
}

Header.defaultProps = {
  token: null,
  loggedUser: null,
};

Header.propTypes = {
  token: pt.string,
  loggedUser: pt.string,
};
