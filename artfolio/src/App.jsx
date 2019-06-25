import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import pt from "prop-types";
import { fetchApi } from "./redux/actions/actionCreators";
import Nav from "./components/Navigation";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import PostForm from "./components/Posts/Forms/postForm";
import PostContainer from "./components/Posts/Posts/PostContainer";
import { fetchAll } from "./constants";

function App(props) {
  const { fetchApi } = props;

  useEffect(() => {
    fetchApi(fetchAll);
  }, [fetchApi]);

  return (
    <div className="app">
      <Nav />
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
