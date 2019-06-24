import React from "react";
import { NavLink } from "react-router-dom";

export default function (props) {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="register">Register</NavLink>
    </nav>
  );
}
