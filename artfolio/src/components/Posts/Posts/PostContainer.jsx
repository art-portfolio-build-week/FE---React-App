import React from "react";
import pt from "prop-types";
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

PostContainer.propTypes = {
  postList: pt.arrayOf(pt.shape({
    id: pt.number,
    username_id: pt.number,
    description: pt.string,
    imgURL: pt.string,
    votes: pt.number,
    username: pt.string,
  })).isRequired,
};
