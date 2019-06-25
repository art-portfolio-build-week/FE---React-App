import React from "react";
import { connect } from "react-redux";
import PostList from "./PostList";

function PostContainer(props) {
  const { postList } = props;
  return (
    <PostList postList={postList} />
  );
}

function mapStateToProps(state) {
  return {
    postList: state.postState.postList,
  };
}

export default connect(mapStateToProps)(PostContainer);