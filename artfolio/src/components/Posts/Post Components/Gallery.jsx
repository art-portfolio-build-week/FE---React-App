import React, { useState, useEffect } from "react";
import pt from "prop-types";
import { connect } from "react-redux";
import PostList from "./PostList";
import { fetchApi } from "../../../redux/actions/actionCreators";
import { fetchAll } from "../../../constants";
import BottomContent from "./GelleryBottomDiv";
import Tabs, { Span, Pagination, Divider } from "./Gallery_CSS";

function Gallery(props) {
  const { postList, fetchApi, token } = props;
  const [inputName, updateName] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  let maxPages = 0;
  const pageLimit = 10;

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
          return postList.sort(
            (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp),
          );
        case "ranking":
          return postList.sort((a, b) => b.votes - a.votes);
        default:
          return postList.sort((a, b) => a.id - b.id);
      }
    }

    return postList.slice(0);
  };

  // This can be abstracted away into another file if you'd like
  // Just wanted to leave it here so you can see the logic at work

  function getPagination(page, limit) {
    return [(page - 1) * limit, page * limit];
  }

  const filterPagination = postList => {
    maxPages = Math.ceil(postList.length / pageLimit);
    const [low, max] = getPagination(currentPage, pageLimit);
    return postList.filter((_, i) => i >= low && i < max);
  };

  const setNameToState = e => {
    setCurrentPage(1);
    updateName(e.target.name);
    const buttons = document.querySelectorAll("li button");
    buttons.forEach(btn => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  const getPaginationLinks = () => {
    const links = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= maxPages; i++) {
      links.push(
        <Span
          className={i === currentPage ? "active" : ""}
          key={i}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Span>,
      );
      if (i < maxPages) links.push(<Divider key={`${i}a`}>|</Divider>);
      if (i >= 5) {
        i += 4;
      }
    }

    return links;
  };

  const filteredPosts = filterPosts();
  const paginatedPosts = filterPagination(filteredPosts);

  return (
    <div>
      {!token && <BottomContent />}
      <Tabs>
        <li>
          <button onClick={setNameToState} name="all" type="button">
            All
          </button>
        </li>
        <li>
          <button onClick={setNameToState} name="recent" type="button">
            Recently Added
          </button>
        </li>
        <li>
          <button onClick={setNameToState} name="photography" type="button">
            Photography
          </button>
        </li>
        <li>
          <button onClick={setNameToState} name="design" type="button">
            Graphic Design
          </button>
        </li>
        <li>
          <button onClick={setNameToState} name="illustration" type="button">
            Illustration
          </button>
        </li>
        <li>
          <button onClick={setNameToState} name="ranking" type="button">
            Voter Ranking
          </button>
        </li>
      </Tabs>
      <Pagination>{getPaginationLinks()}</Pagination>
      <PostList postList={paginatedPosts} />
      <Pagination>{getPaginationLinks()}</Pagination>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    postList: state.postState.postList,
    token: state.authState.token,
  };
}

export default connect(
  mapStateToProps,
  { fetchApi },
)(Gallery);

Gallery.defaultProps = {
  token: null,
};

Gallery.propTypes = {
  fetchApi: pt.func.isRequired,
  token: pt.string,
  postList: pt.arrayOf(
    pt.shape({
      id: pt.number,
      username_id: pt.number,
      description: pt.string,
      imgURL: pt.string,
      votes: pt.number,
      username: pt.string,
    }),
  ).isRequired,
};
