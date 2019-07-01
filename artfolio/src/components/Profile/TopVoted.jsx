import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import pt from "prop-types";
import fallback from "../../assets/images/fallBackImage.png";

const Article = styled.article`
  padding: 0 2rem;
  display:flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  font-family: "latoIta";
  font-style: italic;
  margin: 0 2rem;
  color: black;
  line-height: 1.5;
  img{
    margin: 0 4rem;
    margin-bottom: 1rem;
    height: 250px;
  }
  h3{
    font-family: "lato";
    font-style: normal;
  }
  a{
    text-decoration: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default function TopVoted({ posts }) {
  if (!posts.length) {
    return (
      <Article>
        <img src={fallback} alt="nothing to show" />
        <i>Your highest coted work would appear here.</i>
        <h3>Title: n/a</h3>
      </Article>
    );
  }

  const topPost = posts.sort((a, b) => b.votes - a.votes)[0];

  return (
    <StyledLink to={`/post/${topPost.id}`}>
      <Article>
        <img src={topPost.imgURL} alt={topPost.title} />
        <i>Your most popular work</i>
        <h3>Title: {topPost.title}</h3>
      </Article>
    </StyledLink>
  );
}

TopVoted.propTypes = {
  posts: pt.arrayOf(
    pt.shape({
      imgURL: pt.string,
      title: pt.string,
    }),
  ).isRequired,
};
