import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import pt from "prop-types";
import { fetchApi } from "./redux/actions/actionCreators";
import Nav from "./components/Navigation";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";

function App(props) {
  const { fetchApi } = props;

  useEffect(() => {
    fetchApi("https://5d0f7454c56e7600145a42d8.mockapi.io/api/posts");
  }, []);

  return (
    <div className="app">
      <Nav />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    postsArray: state.postsArray,
    isFetching: state.postsArray,
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, { fetchApi })(App);

App.propTypes = {
  fetchApi: pt.func.isRequired,
};
