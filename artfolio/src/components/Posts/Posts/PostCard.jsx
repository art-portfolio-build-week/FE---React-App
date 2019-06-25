import React from "react";
import { connect } from "react-redux";
import { postToEdit } from "../../../redux/actions/actionCreators";

function PostList(props) {
  const { postToEdit } = props;
  const { description, imgURL, username } = props.post;

  const onClick = () => {
    postToEdit(props.post);
  };

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
