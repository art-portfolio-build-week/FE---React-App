import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import pt from "prop-types";
import { postToEdit, editPost } from "../../../redux/actions/actionCreators";

const Article = styled.article`
  height: 30rem;
  width: 20rem;
  border: 1px solid black;
  img{
    width: 20rem;
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
    editPost(votedObj);
    updateIsLiked(true);
  };

  if (isEditing) {
    return <Redirect to="/postart" />;
  }

  return (
    <Article>
      <h1>{votes}</h1>
      <img src={imgURL} alt="" />
      <p>Title:{' '}{description}</p>
      <h1>Artist: {' '}{username}</h1>
      <button type="button" onClick={passToState}>Edit Post</button>
      {<button type="button" onClick={votePost}>Vote</button>}
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
