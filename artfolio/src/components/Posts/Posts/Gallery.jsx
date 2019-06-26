import React, { useEffect } from "react";
import pt from "prop-types";
import { connect } from "react-redux";
import PostList from "./PostList";
import { fetchApi } from "../../../redux/actions/actionCreators";
import { fetchAll } from "../../../constants";

function Gallery(props) {
  const { postList, fetchApi } = props;

  useEffect(() => {
    fetchApi(fetchAll);
  }, [fetchApi]);

  return (
    <PostList postList={postList} />
  );
}

function mapStateToProps(state) {
  return {
    postList: state.postState.postList,
  };
}

export default connect(mapStateToProps, { fetchApi })(Gallery);

Gallery.propTypes = {
  fetchApi: pt.func.isRequired,
  postList: pt.arrayOf(pt.shape({
    id: pt.number,
    username_id: pt.number,
    description: pt.string,
    imgURL: pt.string,
    votes: pt.number,
    username: pt.string,
  })).isRequired,
};
