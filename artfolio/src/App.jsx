import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import pt from "prop-types";
import { fetchApi } from "./redux/actions/actionCreators";
import Header from "./components/Navigation";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import PostForm from "./components/Posts/Forms/postForm";
import PostContainer from "./components/Posts/Posts/PostContainer";
import { fetchAll } from "./constants";
import lobster from "./assets/fonts/Lobster/Lobster-Regular.ttf";

const GlobalStyle = createGlobalStyle`
body, html{
  @font-face {
    font-family: 'Lobster';
    src: url(${lobster});
    font-style: normal;
    font-weight: 400;
    font-display: cursive
  }
}
  :root{
    font-size: 62.5%;
  }
  *, *::before, *::after{
    box-sizing: border-box;
  }
`;

function App(props) {
  const { fetchApi } = props;

  useEffect(() => {
    fetchApi(fetchAll);
  }, [fetchApi]);

  return (
    <div className="app">
      <GlobalStyle />
      <Header />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/postart" component={PostForm} />
      <Route exact path="/" component={PostContainer} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    postList: state.postList,
    isFetching: state.postList,
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, { fetchApi })(App);

App.propTypes = {
  fetchApi: pt.func.isRequired,
};
