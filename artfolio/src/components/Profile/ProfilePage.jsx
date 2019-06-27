import React, { useEffect } from "react";
import { connect } from "react-redux";
import { authenticate, getUserById } from "../../redux/actions/actionCreators";
import UserPostList from "./UserPostsList";
import { getUser } from "../../constants";

function ProfilePage(props) {
  const { userInfo, match, isFetching, errorMessage } = props;

  useEffect(() => {
    getUserById(getUser(match.params.id));
  });

  if (isFetching) {
    return <p>Loading</p>;
  }
  if (errorMessage) {
    return <p>Post does not exist</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <UserPostList postList={userInfo.posts} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    token: state.authState.token,
    userInfo: state.userState.userInfo,
    isFetching: state.userState.isFetching,
    errorMessage: state.userState.errorMessage,
  };
}

export default connect(mapStateToProps, { authenticate, getUserById })(ProfilePage);