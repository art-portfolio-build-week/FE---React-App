import React from "react";
import styled from "styled-components";
import pt from "prop-types";
import UserPostCard from "./UserPostCard";

const Div = styled.div`
display: flex;
flex-wrap: wrap;
align-content: space-around;
justify-content: space-around;
`;

export default function UserPostList(props) {
  const { postList } = props;
  return (
    <Div>
      {postList.map(post => <UserPostCard key={post.id} post={post} />)}
    </Div>
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
