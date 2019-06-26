import React, { useEffect } from "react";
import pt from "prop-types";
import { connect } from "react-redux";
import PostList from "./PostList";
import { fetchApi } from "../../../redux/actions/actionCreators";
import { fetchAll } from "../../../constants";
import BottomContent from "./GelleryBottomDiv";

function Gallery(props) {
  const { postList, fetchApi, token } = props;
  useEffect(() => {
    fetchApi(fetchAll);
  }, [fetchApi]);

  return (
    <div>
      {!token && <BottomContent />}
      <PostList postList={postList} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    postList: state.postState.postList,
    token: state.authState.token,
  };
}

export default connect(mapStateToProps, { fetchApi })(Gallery);

Gallery.defaultProps = {
  token: null,
}

Gallery.propTypes = {
  fetchApi: pt.func.isRequired,
  token: pt.string,
  postList: pt.arrayOf(pt.shape({
    id: pt.number,
    username_id: pt.number,
    description: pt.string,
    imgURL: pt.string,
    votes: pt.number,
    username: pt.string,
  })).isRequired,
};
