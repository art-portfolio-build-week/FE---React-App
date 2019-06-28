import React, { useEffect, useState } from "react";
import pt from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { postToEdit, deletePost, getUserById } from "../../redux/actions/actionCreators";
import { getPostById, getUser } from "../../constants";

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
  @media (max-width: 1050px){
    margin: 1.5rem 0;
    border: 0.1rem solid grey;
    }
  @media (max-width: 675px){
      margin: 1rem 0;
  }
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

const ViewMore = styled.button`
  background-color: white;
  border: 0.15rem solid black;
  border-radius: 3.5rem;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  transition: 0.2s ease-in;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: black;
    transition: 0.2s ease-out;
  }
`;

const Button = styled.button`
  position: absolute;
  padding: 0;
  margin: 1.5rem;
  font-family: "Font Awesome 5 Pro";
  background-color: rgba(0,0,0,0);
  border: none;
  color: white;
  font-size: 1.8rem;
  right: 0;
  top: 0;
  cursor: pointer;
  &.left{
    left: 0;
  }
  &:hover{
    transform: scale(1.2);
    color: orange;
  }
`;

function UserPostCard(props) {
  const {
    post,
    postToEdit,
    deletePost,
    getUserById,
    userInfo,
  } = props;

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
      <Button type="button" className="left" onClick={deletePostByID}>{"\uf2ed"}</Button>
      <Button type="button" onClick={passToState}>{"\uf044"}</Button>
      <img src={post.imgURL} alt="" />
      <h2>Title: {post.title}</h2>
      <h2>Votes: {post.votes}</h2>
      <Link to={`/post/${post.id}`}><ViewMore type="button">View More</ViewMore></Link>
    </Article>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.userState.userInfo,
  };
}

export default connect(mapStateToProps, { postToEdit, deletePost, getUserById })(UserPostCard);

UserPostCard.propTypes = {
  post: pt.shape({
    imgURL: pt.string,
    post: pt.number,
    id: pt.number,
    username_id: pt.number,
  }).isRequired,
  postToEdit: pt.func.isRequired,
  deletePost: pt.func.isRequired,
  getUserById: pt.func.isRequired,
  userInfo: pt.shape({
    id: pt.number,
  }).isRequired,
};
