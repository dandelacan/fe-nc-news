import VoteUpdater from "./VoteUpdater";
import { Link } from "@reach/router";
import Comments from "./Comments";
import React, { Component } from "react";
import * as api from "../utils/api";

class ArticleCard extends Component {
  state = { comment_count: undefined };
  render() {
    const {
      title,
      body,
      author,
      votes,
      article_id,
      showComments,
      username,
      showFull,
    } = this.props;
    const { comment_count } = this.state;
    return (
      <section className='articleCard'>
        <Link to={`/articles/${article_id}`}>
          <h3>{title}</h3>
        </Link>
        <p className='darkGrey'> author : {author}</p>
        {showFull ? (
          <p className='articleBody'>{body}</p>
        ) : (
          <Link to={`/articles/${article_id}`}>
            <p className='articleBody truncated'>
              {!showFull && body.length > 500 ? body.slice(0, 500) : body}
            </p>
            {!showFull && body.length > 400 && <div className='fadeout'></div>}
          </Link>
        )}
        <VoteUpdater type='article' article_id={article_id} votes={votes} />
        <p className='darkGrey'>comments : {comment_count || ""}</p>
        <Comments
          username={username}
          article_id={article_id}
          showComments={showComments}
          incrementCommentCount={this.incrementCommentCount}
        />
      </section>
    );
  }
  componentDidMount() {
    this.fetchCommentCount();
  }
  fetchCommentCount = () => {
    api.getSingleArticle(this.props.article_id).then(({ comment_count }) => {
      this.setState({ comment_count });
    });
  };
  incrementCommentCount = (difference) => {
    this.setState(({ comment_count }) => {
      console.log(comment_count, difference);
      return { comment_count: parseInt(comment_count) + difference };
    });
  };
}

export default ArticleCard;
