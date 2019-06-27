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
  line-height: 1.1;
  border: 2px solid #405768;
  width: 82rem;
  height: 251px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  h2 {
    line-height: 1.4;
    font-size: 2.4rem;
    font-weight: bold;
    span {
      font-weight: normal;
    }
    margin-left: 2rem;
  }
  p {
    font-size: 2.2rem !important;
    font-family: "latoIta";
    font-style: italic;
    font-weight: 400 !important;
    padding: 2rem;
  }
`;

function UserCard(props) {
  const { user, userID, getUserById, isFetching, errorMessage } = props;

  useEffect(() => {
    // for some reason this hook keeps re-rendering
    // even tough it's set to be onMount and unMount only
    // added a logical condition to exit out useEffect if the id's match
    // to see the effect go to uncomemnt if statement, go profile page & hover over a post
    console.log(typeof userID, userID);
    // if (user) {
    //   if (user.user.id === Number(userID)) {
    //     return;
    //   }
    // }
    getUserById(getUser(userID));
  }, [/*user,*/ getUserById, userID]);

  if (isFetching) {
    return <p>Loading</p>;
  }
  if (errorMessage) {
    return <p>Post does not exist</p>;
  }
  return (
    <Div>
      <p>&quot;{user.user.uvp}&quot;</p>
      <h2>
        Contact: <span>{user.user.email}</span>
      </h2>
      <h2>
        Name: <span>{user.user.username}</span>
      </h2>
    </Div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userState.userInfo,
    isFetching: state.userState.isFetching,
    errorMessage: state.userState.errorMessage
  };
}

export default connect(
  mapStateToProps,
  { getUserById }
)(UserCard);

UserCard.defaultProps = {
  user: {},
  errorMessage: null
};

UserCard.propTypes = {
  user: pt.shape({
    email: pt.string,
    name: pt.string,
    uvp: pt.string
  }),
  userID: pt.string.isRequired,
  getUserById: pt.func.isRequired,
  isFetching: pt.bool.isRequired,
  errorMessage: pt.string
};
