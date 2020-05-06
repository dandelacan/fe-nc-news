import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../utils/api";
import Loader from "./Loader";
import ErrorDisplayer from "./ErrorDisplayer"

class Articles extends Component {
  state = {
    isLoading: true,
    articles: [],
    sortBy: "created_at",
    order: "asc",
    err: null
  };
  render() {
    const { topic, username } = this.props;
    const { articles, isLoading, sortBy, err, order } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrorDisplayer msg={err} />;
    return (
      <section>
        <h2>{topic || "all articles"}</h2>
        <form>
          <label>
            sort by:
        <select
              value={sortBy}
              name='sort by'
              onChange={(e) => this.handleChangeSortBy(e.target.value)}
            >
              <option value='created_at'>date</option>
              <option value='comment_count'>comment count</option>
              <option value='votes'>votes</option>
            </select>
            <label>
              order:<select value={order} name='order' onChange={e => this.handleChangeSortOrder(e.target.value)}>
                <option value='asc'>ascending</option>
                <option value='desc'>descending</option>
              </select>
            </label>
          </label>
        </form>
        {articles.map((article) => {
          return (
            <ArticleCard
              showFull={false}
              username={username}
              key={article.article_id}
              {...article}
            />
          );
        })}
      </section>
    );
  }
  componentDidMount() {
    this.fetchArticles();
  }
  componentDidUpdate(prevProps, prevState) {
    const topicHasChanged = prevProps.topic !== this.props.topic
    const sortByHasChanged = prevState.sortBy !== this.state.sortBy
    const orderHasChanged = prevState.order !== this.state.order
    if (topicHasChanged || sortByHasChanged || orderHasChanged) {
      this.fetchArticles();
    }
  }
  fetchArticles = () => {
    const { sortBy, order } = this.state;
    const { topic } = this.props;
    api.getArticles(sortBy, topic, order).then((articles) => {
      this.setState({ articles, isLoading: false });
    }).catch(() => {
      this.setState({ err: "topic does not exist", isLoading: false });
    });
  };
  handleChangeSortBy = (sortBy) => {
    this.setState({ sortBy });
  };
  handleChangeSortOrder = (order) => {
    console.log(order)
    this.setState({ order })
  }
}

export default Articles;
