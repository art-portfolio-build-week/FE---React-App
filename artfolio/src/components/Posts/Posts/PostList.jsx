import React from "react";
import PostCard from "./PostCard";
// import { connect } from "react-redux";

export default function PostList(props) {
  console.log(props)
  const { postList } = props;
  return (
    <div>
      {postList.map(post => <PostCard post={post} />)}
    </div>
  );
}
