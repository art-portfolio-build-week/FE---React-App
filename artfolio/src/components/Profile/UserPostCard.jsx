import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { postToEdit } from "../../redux/actions/actionCreators";

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
  const { post, postToEdit } = props;
  const [isEditing, updateIsEditing] = useState(false);

  useEffect(() => {
    updateIsEditing(false);
  }, [updateIsEditing]);

  const passToState = () => {
    postToEdit(post.id);
    updateIsEditing(true);
  };

  if (isEditing) {
    return <Redirect to="/postart" />;
  }
  return (
    <Article>
      <button type="button" onClick={passToState}>EDIT</button>
      <img src={post.imgURL} alt="" />
      <h2>Title: {post.title}</h2>
      <h2>Votes: {post.votes}</h2>
      <Link to={`/post/${post.id}`}><button type="button">View More</button></Link>
    </Article>
  );
}

export default connect(state => state, { postToEdit })(UserPostCard);
