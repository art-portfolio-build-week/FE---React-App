import React, { useState } from "react";
import pt from "prop-types";
import { NavLink, Link } from "react-router-dom";
import { HeaderTag } from "./css";
import userSVG from "../../assets/svg/user.svg";
import UserModal from "./UserModal";

export default function Header({ token, loggedUser }) {
  const [modal, updateModal] = useState("none");

  return (
    <HeaderTag>
      <nav>
        <Link exact to="/"><h1>Artista</h1></Link>
        <input type="text" name="search-query" />
        <section>
          <NavLink exact to="/">Galleries</NavLink>
          <NavLink exact to="/find-artists">Find Artists</NavLink>
          {token && <NavLink to="/postart">Add A New Post</NavLink>}
          {token ? (
            <div className="user">
              <NavLink to="#">{loggedUser}</NavLink>
              <img src={userSVG} alt="user" />
            </div>
          ) : (
            <React.Fragment>
              <NavLink to="/register">Sign Up</NavLink>
              <NavLink to="/login">Log In</NavLink>
            </React.Fragment>
          )
          }
        </section>
      </nav>
      {/* <UserModal modal={modal} /> */}
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
