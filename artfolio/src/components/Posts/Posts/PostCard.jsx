import React from "react";
import { connect } from "react-redux";
import pt from "prop-types";
import { postToEdit } from "../../../redux/actions/actionCreators";

function PostList(props) {
  const { postToEdit, post } = props;
  const { description, imgURL, username } = post;

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
