import React from "react";
import pt from "prop-types";
import { NavLink, Link } from "react-router-dom";
import { HeaderTag } from "./css";
import userSVG from "../../assets/svg/user.svg";

export default function Header({ token, loggedUser }) {

  const id = localStorage.getItem("userID");
  const username = localStorage.getItem("username") && localStorage.getItem("username").replace(/\s/g, "");

  return (
    <HeaderTag>
      <nav>
        <Link to="/"><h1>Artista</h1></Link>
        <input type="text" name="search-query" />
        <section>
          <NavLink exact to="/">Galleries</NavLink>
          <NavLink to="/find-artists">Find Artists</NavLink>
          {token ? (
            <Link to={`/u/${username}${id}`} className="user">
              <h4>{loggedUser}</h4>
              <img src={userSVG} alt="user" />
            </Link>
          ) : (
            <React.Fragment>
              <NavLink to="/register">Sign Up</NavLink>
              <NavLink to="/login">Sign In</NavLink>
            </React.Fragment>
          )
          }
        </section>
      </nav>
    </HeaderTag>
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
