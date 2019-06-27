import styled from "styled-components";

export const Article = styled.article`
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
  &:hover {
    transform: scale(1.02);
    transition: 0.2s;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  }
  img {
    width: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  h2 {
    font-family: "lato";
    font-style: normal;
    font-size: 1.6rem;
    font-weight: 500;
  }
  button {
    background-color: white;
    border: 0.15rem solid black;
    border-radius: 3.5rem;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      color: white;
      background-color: black;
      transition: 0.2s;
    }
  }
`;

export const LikeButton = styled.div`
  position: absolute;
  left: 2rem;
  top: 2rem;
  color: ${props => (props.isLiked ? "#e3cf4d" : "#f9fafc")};
  text-shadow: 0rem 0rem 0.3rem #000000;
  font-size: 2rem;
  font-family: "Font Awesome 5 Pro";
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    transition: 0.2s;
    transform: scale(1.1);
  }
`;
