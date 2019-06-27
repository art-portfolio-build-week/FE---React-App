import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import pt from "prop-types";
import { addVotePost, editPost, fetchById } from "../../../redux/actions/actionCreators";
import { getPostById, votePost } from "../../../constants";
import { Article ,LikeButton } from "./PostCard_CSS";

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
