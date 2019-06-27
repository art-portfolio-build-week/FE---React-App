import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import pt from "prop-types";
import { fetchById } from "../../../redux/actions/actionCreators";
import { getPostById } from "../../../constants";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding:5rem;
  *{
    font-family: "lato";
  }
  h1{
    font-size: 4.8rem;
    align-self: flex-start;
  }
  h3, p{
    font-size: 2.6rem;
    font-weight: bold;
  }
  i{
    font-size: 1.6rem;
    margin-top: 1rem;
  }
  img{
    width: 64rem;
    border: 1rem solid white;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    margin: 1rem 0;
  }
  section{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .description{
    margin: 4rem 0;
    align-self: flex-start;
    width: 100%;
    h3{
      align-self: flex-start;
      margin-bottom: 2.5rem;
    }
    p{
      align-self: center;
      text-align: justify;
      font-size: 2.5rem;
      font-weight: normal;
      width: 90%;

    }
  }
`;

function PostPage(props) {
  const {
    post,
    isFetching,
    errorMessage,
    fetchById,
    match,
  } = props;

  useEffect(() => {
    const pageId = match.params.id;
    fetchById(getPostById(pageId));
  }, [fetchById, match]);

  if (isFetching) {
    return <p>Loading</p>;
  }
  if (errorMessage) {
    return <p>Post does not exist</p>;
  }
  return (
    <Div>
      <h1>{post.title}</h1>

      <section>
        <img src={post.imgURL} alt={post.title} />
        <i>Published On: {moment(post.timestamp).format("LL")}</i>
        <i>Upvote Count: {post.votes}</i>
      </section>

      <section className="description">
        <h3>Description of Piece</h3>
        <p>{post.description}</p>
      </section>
    </Div>
  );
}

function mapStateToProps(state) {
  return {
    post: state.postIdState.postById,
    isFetching: state.postIdState.isFetchingId,
    errorMessage: state.postIdState.errorMessageId,
  };
}

export default connect(mapStateToProps, { fetchById })(PostPage);

PostPage.defaultProps = {
  errorMessage: null,
  match: null,
};

PostPage.propTypes = {
  post: pt.shape({
    id: pt.number.isRequired,
    username_id: pt.number.isRequired,
    description: pt.string.isRequired,
    imgURL: pt.string.isRequired,
    votes: pt.number.isRequired,
  }).isRequired,

  isFetching: pt.bool.isRequired,
  errorMessage: pt.string,
  fetchById: pt.func.isRequired,
  match: pt.shape({
    params: pt.object,
  }),
};
