import React from "react";
import { connect } from "react-redux";

export default function PostList(props) {
  const { description, imgURL } = props.post;

  const onClick = () => {
    
  };

  return (
    <article>
      <img src={imgURL} alt="" />
      <p>{description}</p>
      <button type="button" onClick={onClick}>Edit Post</button>
    </article>
  );
}


