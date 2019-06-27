import React, { useState, useEffect } from "react";
import pt from "prop-types";
import { connect } from "react-redux";
import PostList from "./PostList";
import { fetchApi } from "../../../redux/actions/actionCreators";
import { fetchAll } from "../../../constants";
import BottomContent from "./GelleryBottomDiv";
import Tabs from "./Gallery_CSS";

function Gallery(props) {
  const { postList, fetchApi, token } = props;
  const [inputName, updateName] = useState(null);

  useEffect(() => {
    fetchApi(fetchAll);
  }, [fetchApi]);


  const filterPosts = () => {
    if (inputName) {
      switch (inputName) {
        case "photography":
          return postList.filter(post => post.category === "photography");
        case "design":
          return postList.filter(post => post.category === "design");
        case "illustration":
          return postList.filter(post => post.category === "illustration");
        case "recent":
          return postList.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
        case "ranking":
          return postList.sort((a, b) => b.votes - a.votes);
        default:
          return postList.sort((a, b) => a.id - b.id);
      }
    }
    return postList.slice(0);
  };

  const setNameToState = (e) => {
    const buttons = document.querySelectorAll("li button");
    buttons.forEach(btn => {
      btn.classList.remove("active");
    });
    updateName(e.target.name);
    e.target.classList.add("active");
  };

  const filteredPosts = filterPosts();

  return (
    <div>
      {!token && <BottomContent />}
      <Tabs>
        <li><button onClick={setNameToState} name="all" type="button">All</button></li>
        <li><button onClick={setNameToState} name="recent" type="button">Recently Added</button></li>
        <li><button onClick={setNameToState} name="photography" type="button">Photography</button></li>
        <li><button onClick={setNameToState} name="design" type="button">Graphic Design</button></li>
        <li><button onClick={setNameToState} name="illustration" type="button">Illustration</button></li>
        <li><button onClick={setNameToState} name="ranking" type="button">Voter Ranking</button></li>
      </Tabs>
      <PostList postList={filteredPosts} />
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
};

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
