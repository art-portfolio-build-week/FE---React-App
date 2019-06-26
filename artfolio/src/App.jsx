import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import pt from "prop-types";
import { authenticate, setLoggedUser } from "./redux/actions/actionCreators";

// Components
import Header from "./components/Navigation";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import PostForm from "./components/Posts/Forms/postForm";
import Gallery from "./components/Posts/Post Components/Gallery";
import PostPage from "./components/Posts/Post Components/PostPage";

// Import fonts
import lobster from "./assets/fonts/Lobster/Lobster-Regular.ttf";
import latoRegular from "./assets/fonts/Lato/Lato-Regular.ttf";
import latoBold from "./assets/fonts/Lato/Lato-Bold.ttf";
import latoItalic from "./assets/fonts/Lato/Lato-Italic.ttf";

const GlobalStyle = createGlobalStyle`
body, html{
  @font-face {
    font-family: 'Lobster';
    src: url(${lobster});
    font-style: normal;
    font-weight: 400;
    font-display: cursive
  }
@font-face {
    font-family: 'Lato';
    src: url(${latoRegular});
    font-style: normal;
    font-weight: 400;
    font-display: sans-serif
  }
@font-face {
    font-family: 'Lato';
    src: url(${latoBold});
    font-weight: bold;
    font-display: sans-serif
  }
@font-face {
    font-family: 'LatoIta';
    src: url(${latoItalic});
    font-style: italic, oblique;
    font-display: sans-serif
  }
}
  :root{
    font-size: 62.5%;
  }
  *, *::before, *::after, a{
    box-sizing: border-box;
    font-family: 'lato'
  }
`;

const AppDiv = styled.div`
  /* max-width: 825px;
  width: 100%; */
`;

function App(props) {
  const {
    authenticate,
    token,
    loggedUser,
    setLoggedUser,
  } = props;

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (localToken) {
      authenticate(localToken);
      setLoggedUser(username);
    }
  }, [token, authenticate]);

  return (
    <AppDiv>
      <GlobalStyle />
      <Header token={token} loggedUser={loggedUser} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/postart" component={PostForm} />
      <Route exact path="/" component={Gallery} />
      <Route path="/post/:id" component={PostPage} />
    </AppDiv>
  );
}

function mapStateToProps(state) {
  return {
    postList: state.postState.postList,
    isFetching: state.postState.postList,
    errorMessage: state.postState.errorMessage,
    token: state.authState.token,
    loggedUser: state.authState.loggedUser,
  };
}

export default connect(mapStateToProps, { authenticate, setLoggedUser })(App);

App.defaultProps = {
  token: null,
  loggedUser: null,
};

App.propTypes = {
  token: pt.string,
  authenticate: pt.func.isRequired,
  loggedUser: pt.string,
  setLoggedUser: pt.func.isRequired,
};
