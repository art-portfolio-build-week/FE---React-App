import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import pt from "prop-types";
import { fetchApi, authenticate } from "./redux/actions/actionCreators";
import Header from "./components/Navigation";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import PostForm from "./components/Posts/Forms/postForm";
import PostContainer from "./components/Posts/Posts/PostContainer";
import { fetchAll } from "./constants";
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
    font-family: 'Lato';
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
  max-width: 825px;
  width: 100%;
`;

function App(props) {
  const { fetchApi, authenticate, token } = props;

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    fetchApi(fetchAll);
    return localToken ? authenticate(localToken) : null;
  }, [fetchApi, authenticate]);

  return (
    <AppDiv>
      <GlobalStyle />
      <Header token={token} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/postart" component={PostForm} />
      <Route exact path="/" component={PostContainer} />
    </AppDiv>
  );
}

function mapStateToProps(state) {
  return {
    postList: state.postState.postList,
    isFetching: state.postState.postList,
    errorMessage: state.postState.errorMessage,
    token: state.authState.token,
  };
}

export default connect(mapStateToProps, { fetchApi, authenticate })(App);

App.defaultProps = {
  token: null,
};

App.propTypes = {
  fetchApi: pt.func.isRequired,
  token: pt.string,
};
