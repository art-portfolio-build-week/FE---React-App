import React, { useEffect } from "react";
import { connect } from "react-redux";
import { authenticate, getUserById } from "../../redux/actions/actionCreators";
import UserPostList from "./UserPostsList";
import { getUser } from "../../constants";
import UserCard from "./UserCard";

function ProfilePage(props) {
  const { userInfo, match, isFetching, errorMessage, getUserById } = props;

  useEffect(() => {
    getUserById(getUser(match.params.id));
  }, [match, getUserById]);

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
      <UserCard userID={match.params.id} />
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