import React, { useEffect } from "react";

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

import GlobalStyles from "./css";

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
  }, [token, authenticate, setLoggedUser]);

  return (
    <>
      <GlobalStyles />
      <Header token={token} loggedUser={loggedUser} />
      <Route exact path="/" component={Gallery} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/postart" component={PostForm} />
      <Route path="/post/:id" component={PostPage} />
    </>
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
