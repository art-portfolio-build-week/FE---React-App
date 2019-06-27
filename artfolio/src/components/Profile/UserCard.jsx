import React, { useEffect } from "react";
import pt from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { getUserById } from "../../redux/actions/actionCreators";
import { getUser } from "../../constants";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.8;
  border: 2px solid #405768;
  width: 82rem;
  height: 251px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
  h2{
    font-size: 2.4rem;
    font-weight: bold;
    span{
      font-weight: normal;
    }
    margin-left: 2rem;
  }
  p{
    font-family: "latoIta";
    font-style: italic;
    font-weight: 400 !important;
    margin-left: 1rem;
  }
`;

function UserCard(props) {
  const {
    user,
    userID,
    getUserById,
    isFetching,
    errorMessage,
  } = props;

  useEffect(() => {
    getUserById(getUser(userID));
  }, [getUserById, userID]);

  if (isFetching) {
    return <p>Loading</p>;
  }
  if (errorMessage) {
    return <p>Post does not exist</p>;
  }
  return (
    <Div>
      <p>&quot;{user.user.uvp}&quot;</p>
      <h2>Contact: <span>{user.user.email}</span></h2>
      <h2>Name: <span>{user.user.username}</span></h2>
    </Div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userState.userInfo,
    isFetching: state.userState.isFetching,
    errorMessage: state.userState.errorMessage,
  };
}

export default connect(mapStateToProps, { getUserById })(UserCard);

UserCard.propTypes = {
  user: pt.shape({
    email: pt.string.isRequired,
    name: pt.string.isRequired,
    uvp: pt.string.isRequired,
  }).isRequired,
  userID: pt.string.isRequired,
  getUserById: pt.func.isRequired,
  isFetching: pt.string.isRequired,
  errorMessage: pt.string.isRequired,
};
