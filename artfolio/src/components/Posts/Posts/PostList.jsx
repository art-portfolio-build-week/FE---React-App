import React from "react";
import pt from "prop-types";
import PostCard from "./PostCard";
// import { connect } from "react-redux";

export default function PostList(props) {
  const { postList } = props;
  return (
    <div>
      {postList.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
}

PostList.propTypes = {
  postList: pt.arrayOf(pt.shape({
    id: pt.number,
    username_id: pt.number,
    description: pt.string,
    imgURL: pt.string,
    votes: pt.number,
    username: pt.string,
  })).isRequired,
};
