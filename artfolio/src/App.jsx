import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchApi } from "./actions/actionCreators";

function App(props) {
  const { fetchApi } = props;

  useEffect(() => {
    fetchApi("https://5d0f7454c56e7600145a42d8.mockapi.io/api/posts");
  }, []);

  return (
    <div className="app">
      <h1>Hello World</h1>
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
