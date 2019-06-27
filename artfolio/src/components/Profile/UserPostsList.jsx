import React from "react";
import pt from "prop-types";
import UserPostCard from "./UserPostCard";

export default function UserPostList(props) {
  const { postList } = props;
  return (
    <div>
      {postList.map(post => <UserPostCard key={post.id} post={post} />)}
    </div>
  );
}

UserPostList.propTypes = {
  postList: pt.arrayOf(pt.shape({
    id: pt.number,
    username_id: pt.number,
    description: pt.string,
    imgURL: pt.string,
    votes: pt.number,
    username: pt.string,
  })).isRequired,
};
