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
    // console.dir(this.props);
    const { article, isLoading, err } = this.state;
    console.log(err);
    if (isLoading) return <Loader />;
    if (err) return <ErrorDisplayer msg={err} />;
    return (
      <ArticleCard
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
    console.log(this.props.article_id);
    api
      .getSingleArticle(this.props.article_id)
      .then((article) => {
        this.setState({ isLoading: false, article });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.msg, isLoading: false });
      });
  };
}

export default SingleArticle;
