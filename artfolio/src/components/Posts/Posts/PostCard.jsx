import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import pt from "prop-types";
import { postToEdit, editPost } from "../../../redux/actions/actionCreators";
import { putPost } from "../../../constants";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 30rem;
  width: 25rem;
  margin: 1.5rem;

  img{
    width: 100%;
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
  }
`;

function PostList(props) {
  const { postToEdit, post } = props;
  const { description, imgURL, username, votes } = post;

  const [isEditing, updateIsEditing] = useState(false);
  const [isLiked, updateIsLiked] = useState(false);

  useEffect(() => {
    updateIsEditing(false);
  }, [updateIsEditing]);

  const passToState = () => {
    postToEdit(props.post);
    updateIsEditing(true);
  };

  const votePost = () => {
    if (isLiked) {
      const unvotedObj = { ...props.post, votes: votes - 1 };
      editPost(unvotedObj);
      updateIsLiked(false);
    }
    const votedObj = { ...props.post, votes: votes + 1 };
    editPost(putPost(votedObj.id), votedObj);
    updateIsLiked(true);
  };

  if (isEditing) {
    return <Redirect to="/postart" />;
  }

  return (
    <Article>
      <img src={imgURL} alt="" />
      <h2>Title: {description}</h2>
      <h2>Artist: {username}</h2>
      {/* <button type="button" onClick={passToState}>Edit Post</button>
      {<button type="button" onClick={votePost}>Vote</button>} */}
      <button>View More</button>
    </Article>
  );
}

export default connect(state => state, { postToEdit, editPost })(PostList);

PostList.defaultProps = {
  post: {},
};

PostList.propTypes = {
  postToEdit: pt.func.isRequired,
  post: pt.shape({
    id: pt.number.isRequired,
    username_id: pt.number.isRequired,
    description: pt.string.isRequired,
    imgURL: pt.string.isRequired,
    votes: pt.number.isRequired,
    username: pt.string.isRequired,
  }),
};
