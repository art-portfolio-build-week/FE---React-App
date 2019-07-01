import styled from "styled-components";

export default styled.ul`
  display: flex;
  padding: 5rem;
  justify-content: center;
  align-items: center;
  @media (max-width: 1360px){
    flex-direction: column;
    align-items: stretch;
  }
  button {
    padding: 0.5rem 1.8rem;
    font-size: 2.4rem;
    background-color: white;
    border: 1px solid black;
    transition: 0.1s ease-in-out;
    cursor: pointer;
    @media (max-width: 1360px){
      width: 100%;
  }
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

export const Span = styled.span`
  cursor: pointer;
  font-size: 1.8rem;
  font-family: "lato";

  &.active {
    font-weight: 800;
    cursor: initial;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

export const Divider = styled.span`
  margin: 0 5px;
  font-size: 1.8rem;
`;
