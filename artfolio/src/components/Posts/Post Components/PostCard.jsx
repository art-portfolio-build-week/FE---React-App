import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import pt from "prop-types";
import { postToEdit, editPost, fetchById } from "../../../redux/actions/actionCreators";
import { getPostById } from "../../../constants";

const Article = styled.article`
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

function PostList(props) {
  const { post, fetchById } = props;
  const { title, imgURL, username, votes, id } = post;

  const [isEditing, updateIsEditing] = useState(false);
  const [isLiked, updateIsLiked] = useState(false);

  useEffect(() => {
    updateIsEditing(false);
  }, [updateIsEditing]);

  const viewMore = () => {
    fetchById(getPostById(id));
  };

  const votePost = () => {
    if (isLiked) {
      const unvotedObj = { ...props.post, votes: votes - 1 };
      // editPost(unvotedObj);
      updateIsLiked(false);
    }
    const votedObj = { ...props.post, votes: votes + 1 };
    editPost(getPostById(votedObj.id), votedObj);
    updateIsLiked(true);
  };

  if (isEditing) {
    return <Redirect to="/postart" />;
  }

  return (
    <Article>
      <img src={imgURL} alt="" />
      <h2>Title: {title}</h2>
      <h2>Artist: {username}</h2>
      {/* <button type="button" onClick={passToState}>Edit Post</button>
      {<button type="button" onClick={votePost}>Vote</button>} */}
      <Link to={`/post/${id}`}><button onClick={viewMore} type="button">View More</button></Link>
    </Article>
  );
}

export default connect(state => state, { editPost, fetchById })(PostList);

PostList.defaultProps = {
  post: {},
};

PostList.propTypes = {
  postToEdit: pt.func.isRequired,
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
