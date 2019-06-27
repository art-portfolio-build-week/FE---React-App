import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import pt from "prop-types";
import { addVotePost, editPost, fetchById } from "../../../redux/actions/actionCreators";
import { getPostById, votePost } from "../../../constants";

const Article = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 30rem;
  width: 25rem;
  transition: transform 0.2s;
  margin: 1.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  &:hover{
      transform: scale(1.02);
      transition: 0.2s;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    }
  img{
    width: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  h2{
    font-family: "lato";
    font-style: normal;
    font-size: 1.6rem;
    font-weight: 500;
  }
  button{
    background-color: white;
    border: 0.15rem solid black;
    border-radius: 3.5rem;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    transition: 0.2s;
    cursor: pointer;
    &:hover{
      color: white;
      background-color: black;
      transition: 0.2s;
    }
  }
  
`;

const bounceLike = keyframes`
  40% {
    -webkit-transform: translateY(-6px);
            transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  65% {
    -webkit-transform: translateY(-12px);
            transform: translateY(-12px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  82% {
    -webkit-transform: translateY(-6px);
            transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  93% {
    -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
`;

// throws an error because of vscode typescript linting no idea why but it works
const mixin = css`
  ${bounceLike}  0.9s both
`;

const LikeButton = styled.div` 
    position: absolute;
    left: 2rem;
    top: 2rem;
    animation: ${props => (props.isLiked ? mixin : "none")};
    color: ${props => (props.isLiked ? "#a9c1d3" : "#f9fafc")};
    text-shadow: 0rem 0rem 0.3rem #000000;
    font-size: 2rem;
    font-family: "Font Awesome 5 Pro";
    transition: 0.2s;
    cursor: pointer;
    &:hover{
      transition: 0.2s;
      transform: scale(1.1);
      color: orange;
    }
`;

function PostCard(props) {
  const { post, fetchById, addVotePost } = props;
  const {
    title,
    imgURL,
    username,
    votes,
    id,
  } = post;

  const [isLiked, updateIsLiked] = useState(false);

  const viewMore = () => {
    fetchById(getPostById(id));
  };

  const votePostByID = () => {
    if (isLiked) {
      const subtractVote = { votes: (votes - 1).toString() };
      addVotePost(votePost(id), subtractVote);
      updateIsLiked(false);
      return;
    }
    const addVote = { votes: (votes + 1).toString() };
    addVotePost(votePost(id), addVote);
    updateIsLiked(true);
  };


  return (
    <Article>
      <LikeButton type="button" isLiked={isLiked} onClick={votePostByID}>{"\uf164"}</LikeButton>
      <img src={imgURL} alt="" />
      <h2>Title: {title}</h2>
      <h2>Artist: {username}</h2>
      <Link to={`/post/${id}`}><button onClick={viewMore} type="button">View More</button></Link>
    </Article>
  );
}

export default connect(state => state, { editPost, fetchById, addVotePost })(PostCard);

PostCard.defaultProps = {
  post: {},
};

PostCard.propTypes = {
  addVotePost: pt.func.isRequired,
  fetchById: pt.func.isRequired,
  post: pt.shape({
    id: pt.number.isRequired,
    username_id: pt.number.isRequired,
    title: pt.string.isRequired,
    imgURL: pt.string.isRequired,
    votes: pt.number.isRequired,
    username: pt.string.isRequired,
  }),
};
