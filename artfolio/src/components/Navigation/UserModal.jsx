import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticate, getUserById } from "../../redux/actions/actionCreators";
import { getUser } from "../../constants"

function UserModal({ modal, authenticate, getUserById }) {

  const id = localStorage.getItem("userID");
  const username = localStorage.getItem("username") && localStorage.getItem("username").replace(/\s/g, "");

  useEffect(() => {
    getUserById(getUser(id));
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
    authenticate(null);
  };

  return (
    <div style={{ display: modal ? "initial" : "none" }}>
      <Link to={`/u/${username}${id}`}><button type="button">Profile</button></Link>
      <button type="button" onClick={logout}>Logout</button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    token: state.authState.token,
  };
}

export default connect(mapStateToProps, { authenticate, getUserById })(UserModal);
