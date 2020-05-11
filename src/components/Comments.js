import React, { Component } from "react";
import CommentCard from "./CommentCard";
import * as api from "../utils/api";
import CommentAdder from "./CommentAdder";

class Comments extends Component {
  state = {
    isShown: false,
    isLoading: true,
    comments: [],
    err: false,
  };
  render() {
    const { comments, isShown, err } = this.state;
    const { username, article_id } = this.props;
    if (!isShown) {
      return (
        <button onClick={() => this.toggleComments()}>show comments</button>
      );
    }
    return (
      <div>
        <button onClick={() => this.toggleComments()}>hide comments</button>
        <CommentAdder
          article_id={article_id}
          username={username}
          extendComments={this.extendComments}
        />
        {err && <h3>sorry we couldn't delete your comment at the minute</h3>}
        {comments.map((comment) => {
          return (
            <CommentCard
              removeComment={this.removeComment}
              key={comment.comment_id}
              username={username}
              {...comment}
            />
          );
        })}
      </div>
    );
  }
  componentDidMount() {
    this.fetchComments();
    if (this.props.showComments) this.setState({ showComments: true });
  }

  fetchComments = () => {
    const { article_id } = this.props;
    api.getComments(article_id).then((comments) => {
      this.setState({ comments });
    });
  };
  toggleComments = () => {
    this.setState((currentState) => {
      const newIsShown = !currentState.isShown;
      return {
        isShown: newIsShown,
      };
    });
  };
  extendComments = (comment) => {
    const { incrementCommentCount } = this.props;
    incrementCommentCount(1);
    this.setState(({ comments }) => {
      const extendedComments = [comment, ...comments];
      return { comments: extendedComments };
    });
  };
  removeComment = (comment_id) => {
    const { incrementCommentCount } = this.props;
    api
      .deleteComment(comment_id)
      .then(() => {
        incrementCommentCount(-1);
        this.setState(({ comments }) => {
          const filteredComments = comments.filter(
            (comment) => comment.comment_id !== comment_id
          );
          return { comments: filteredComments, err: false };
        });
      })
      .catch(() => {
        incrementCommentCount(1);
        this.setState({ err: true });
      });
  };
}

export default Comments;
