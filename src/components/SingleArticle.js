import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../utils/api";
import Loader from "./Loader";
import ErrorDisplayer from "./ErrorDisplayer";

class SingleArticle extends Component {
  state = {
    isLoading: true,
    article: {},
    err: null,
  };
  render() {
    const { article, isLoading, err } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrorDisplayer msg={err} />;
    return (
      <ArticleCard
        showFull={true}
        username={this.props.username}
        {...article}
        showComments={true}
      />
    );
  }
  componentDidMount() {
    this.fetchSingleArticle();
  }
  fetchSingleArticle = () => {
    api
      .getSingleArticle(this.props.article_id)
      .then((article) => {
        this.setState({ isLoading: false, article });
      })
      .catch((err) => {
        this.setState({ err: "article does not exist", isLoading: false });
      });
  };
}

export default SingleArticle;
