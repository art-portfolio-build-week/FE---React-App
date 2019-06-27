import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { postToEdit, deletePost, getUserById } from "../../redux/actions/actionCreators";
import { getPostById, getUser } from "../../constants"

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
`;

function UserPostCard(props) {
  const { post, postToEdit, deletePost, getUserById, userInfo } = props;
  const [isEditing, updateIsEditing] = useState(false);
  useEffect(() => {
    updateIsEditing(false);
  }, [updateIsEditing, userInfo]);

  const passToState = () => {
    postToEdit(post);
    updateIsEditing(true);
  };

  const deletePostByID = () => {
    deletePost(getPostById(post.id), post.username_id);
    getUserById(getUser(userInfo.user.id));
  };

  if (isEditing) {
    return <Redirect to="/postart" />;
  }
  return (
    <Article>
      <button type="button" onClick={passToState}>EDIT</button>
      <button type="button" onClick={deletePostByID}>Delete</button>
      <img src={post.imgURL} alt="" />
      <h2>Title: {post.title}</h2>
      <h2>Votes: {post.votes}</h2>
      <Link to={`/post/${post.id}`}><button type="button">View More</button></Link>
    </Article>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.userState.userInfo,
  };
}

export default connect(mapStateToProps, { postToEdit, deletePost, getUserById })(UserPostCard);
