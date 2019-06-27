import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserById } from "../../../redux/actions/actionCreators";
import { getUser } from "../../../constants";

function UserCard(props) {
  const { user, userID, getUserById, isFetching, errorMessage } = props;

  useEffect(() => {
    getUserById(getUser(userID));
  }, [getUserById, userID]);

  if (isFetching) {
    return <p>Loading</p>;
  }
  if (errorMessage) {
    return <p>Post does not exist</p>;
  }
  return (
    <div>
      <p>{user.uvp}</p>
      <h1>Contact: <span>{user.user.email}</span></h1>
      <h1>Name: <span>{user.user.username}</span></h1>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userState.userInfo,
    isFetching: state.userState.isFetching,
    errorMessage: state.userState.errorMessage,
  };
}

export default connect(mapStateToProps, { getUserById })(UserCard);
