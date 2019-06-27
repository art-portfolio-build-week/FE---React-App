import React from "react";
import pt from "prop-types";

export default function TopVoted({ posts }) {

  const topPost = posts.sort((a, b) => b.votes - a.votes)[0];

  return (
    <article>
      <img src={topPost.imgURL} alt={topPost.title} />
      <i>Your most popular work</i>
      <h3>Title: {topPost.title}</h3>
    </article>
  );
}

TopVoted.propTypes = {
  posts: pt.shape({
    imgURL: pt.string,
    title: pt.string,
  }).isRequired,
};
