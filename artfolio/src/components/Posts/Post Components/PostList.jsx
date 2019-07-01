import React from "react";
import pt from "prop-types";
import styled from "styled-components";
import PostCard from "./PostCard";

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;
  padding: 0 25rem;
  @media (max-width: 1360px){
    padding: 0 5rem;
  }
`;

export default function PostList(props) {
  const { postList } = props;
  return (
    <Div>
      {postList.map(post => <PostCard key={post.id} post={post} />)}
    </Div>
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
