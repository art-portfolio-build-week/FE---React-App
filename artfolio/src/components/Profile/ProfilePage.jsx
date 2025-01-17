import React, { useEffect, useState } from "react";
import pt from "prop-types";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticate, getUserById } from "../../redux/actions/actionCreators";
import UserPostList from "./UserPostsList";
import { getUser } from "../../constants";
import UserCard from "./UserCard";
import TopVoted from "./TopVoted";

const PostPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 1250px){
      width: 100%;
    }
`;

const AddButton = styled.button`
  font-family: "Font Awesome 5 Pro";
  background-color: rgba(0,0,0,0);
  border: none;
  margin-top: 10rem;
  font-size: 7.6rem;
  transition: 0.1s ease-in;
  cursor: pointer;
  &:hover{
    transition: 0.1s ease-out;
    transform: scale(1.1);
  }
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between !important;
  padding: 5rem 5rem;
  @media (max-width: 1250px){
    justify-content: center !important;
    flex-direction: row !important;
  }
  h1{
    font-size: 4.8rem;
    @media (max-width: 1250px){
      width: 40%;
    }
  }
  display: flex;
  font-family: "lato";
  font-weight: bold;
  button{
    margin-top:0;
    font-family: "latoIta";
    font-size: 2.8rem;
    color: #153D5B;
    @media (max-width: 1250px){
      width: 40%;
    }
    &:hover{
      text-decoration: underline;
    }
  }
`;

const UserCardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 1250){
    flex-direction: column;
  }
  div{
    width: 100%;
    display: flex;
    justify-content: center;
      @media (max-width: 1250px){
        flex-direction: column;
      }
    section{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 2rem;
      margin-bottom: 10rem;
      p{
        font-size: 2.8rem;
        font-family: "lato";
      }
    }
  }
`;

const ShowCase = styled.div`
  background-color: #f3f5f5;
  width: 100%;
  border: 0.2rem solid #153D5B;
  padding: 2rem;
  margin-bottom: 10rem;
  h1{
    font-size: 3rem;
    font-family: "lato";
    font-weight: bold;
  }
  p{
    text-align: center;
    font-size: 3rem;
    padding: 10rem;
    font-family: "lato";
  }
`;

function ProfilePage(props) {
  const {
    userInfo,
    match,
    authenticate,
    isFetching,
    errorMessage,
    getUserById,
  } = props;

  const [loggedOut, updateLogged] = useState(false);

  useEffect(() => {
    getUserById(getUser(match.params.id));
  }, [match, getUserById]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
    authenticate(null);
    updateLogged(true);
  };

  if (isFetching) {
    return <p>Loading</p>;
  }

  if (errorMessage) {
    return <p>Post does not exist</p>;
  }

  if (loggedOut) {
    return <Redirect to="/" />;
  }
  return (
    <PostPageContainer>
      <UserCardContainer>
        <TopDiv>
          <h1>Your Gallery</h1>
          <AddButton onClick={logout} type="button">Log Out</AddButton>
        </TopDiv>
        <div>
          <TopVoted posts={userInfo.posts} />
          <section>
            <UserCard userID={match.params.id} />
            <Link to="/postart"><AddButton>{"\uf0fe"}</AddButton></Link>
            <p>Create a Post</p>
          </section>
        </div>
      </UserCardContainer>
      <ShowCase>
        <h1>Showcase Work Projects</h1>
        {
          userInfo.posts.length
            ? <UserPostList postList={userInfo.posts} />
            : <p>This is where you would place work you want to show off most.</p>
        }
      </ShowCase>

    </PostPageContainer>
  );
}

function mapStateToProps(state) {
  return {
    token: state.authState.token,
    userInfo: state.userState.userInfo,
    isFetching: state.userState.isFetching,
    errorMessage: state.userState.errorMessage,
  };
}

export default connect(mapStateToProps, { authenticate, getUserById })(ProfilePage);

ProfilePage.defaultProps = {
  errorMessage: null,
  userInfo: null,
};

ProfilePage.propTypes = {
  userInfo: pt.shape({
    posts: pt.array,
  }),
  match: pt.shape({
    params: pt.shape({ id: pt.string }),
  }).isRequired,
  authenticate: pt.func.isRequired,
  isFetching: pt.bool.isRequired,
  errorMessage: pt.string,
  getUserById: pt.func.isRequired,
};
