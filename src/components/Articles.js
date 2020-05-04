import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../utils/api";
import Loader from "./Loader";

class Articles extends Component {
  state = {
    isLoading: true,
    articles: [],
    sortBy: "created_at",
  };
  render() {
    // console.log(this.state);
    // console.log(this.props);
    const { topic, username } = this.props;
    const { articles, isLoading, sortBy } = this.state;
    if (isLoading) return <Loader />;
    return (
      <section>
        <h2>{topic || "all articles"}</h2>
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
        {articles.map((article) => {
          return (
            <ArticleCard
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
    if (
      prevProps.topic !== this.props.topic ||
      prevState.sortBy !== this.state.sortBy
    ) {
      this.fetchArticles();
    }
  }
  fetchArticles = () => {
    const { sortBy } = this.state;
    const { topic } = this.props;
    api.getArticles(sortBy, topic).then((articles) => {
      console.log(articles);
      this.setState({ articles, isLoading: false });
    });
  };
  handleChangeSortBy = (sortBy) => {
    this.setState({ sortBy });
  };
}

export default Articles;
