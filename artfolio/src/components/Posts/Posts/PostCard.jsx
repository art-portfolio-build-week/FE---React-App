import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import pt from "prop-types";
import { postToEdit } from "../../../redux/actions/actionCreators";

function PostList(props) {
  const { postToEdit, post } = props;
  const { description, imgURL, username } = post;

  const [isEditing, updateIsEditing] = useState(false);

  useEffect(() => {
    updateIsEditing(false);
  }, [updateIsEditing]);

  const onClick = () => {
    postToEdit(props.post);
    updateIsEditing(true);
  };
  if (isEditing) {
    return <Redirect to="/postart" />;
  }

  return (
    <article>
      <h1>{username}</h1>
      <img src={imgURL} alt="" />
      <p>{description}</p>
      <button type="button" onClick={onClick}>Edit Post</button>
    </article>
  );
}

export default connect(state => state, { postToEdit })(PostList);

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
