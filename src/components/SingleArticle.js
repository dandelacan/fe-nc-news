import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../utils/api";
import Loader from "./Loader";

class SingleArticle extends Component {
  state = {
    isLoading: true,
    article: {},
  };
  render() {
    // console.dir(this.props);
    const { article, isLoading } = this.state;
    if (isLoading) return <Loader />;
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
    api.getSingleArticle(this.props.article_id).then((article) => {
      this.setState({ isLoading: false, article });
    });
  };
}

export default SingleArticle;
