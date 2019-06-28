import styled from "styled-components";

export default styled.ul`
  display: flex;
  padding: 5rem;
  justify-content: center;
  align-items: center;
  button {
    padding: 0.5rem 1.8rem;
    font-size: 2.4rem;
    background-color: white;
    border: 1px solid black;
    transition: 0.1s ease-in-out;
    cursor: pointer;
    &:hover {
      transition: 0.1s ease-in-out;
      color: #081826;
      background-color: #153d5b66;
    }
  }
  .active {
    background-color: #153d5b66;
    color: #081826;
  }
`;
