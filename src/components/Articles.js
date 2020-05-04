import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../utils/api";
import Loader from "./Loader";

class Articles extends Component {
  state = {
    isLoading: true,
    articles: [],
  };
  render() {
    console.log(this.state);
    console.log(this.props);
    const { topic } = this.props;
    const { articles, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <section>
        <h2>{topic || "all articles"}</h2>
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} {...article} />;
        })}
      </section>
    );
  }
  componentDidMount() {
    this.fetchArticles(this.topic);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticles(this.topic);
    }
  }
  fetchArticles = () => {
    api.getArticles(this.props.topic).then((articles) => {
      console.log(articles);
      this.setState({ articles, isLoading: false });
    });
  };
}

export default Articles;
