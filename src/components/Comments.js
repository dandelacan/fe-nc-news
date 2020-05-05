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
    console.log(isShown);
    if (!this.state.isShown) {
      return (
        <button onClick={() => this.toggleComments()}>show comments</button>
      );
    }
    return (
      <div>
        <CommentAdder
          article_id={article_id}
          username={username}
          extendComments={this.extendComments}
        />
        <button onClick={() => this.toggleComments()}>hide comments</button>
        {err && <h3>sorry we couldn't delete you comment at the minute</h3>}
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
      return { ...currentState, isShown: newIsShown };
    });
  };
  extendComments = (comment) => {
    this.setState(({ isLoading, isShown, comments }) => {
      const extendedComments = [comment, ...comments];
      console.log(isShown, isLoading, extendedComments);
      return { comments: extendedComments };
    });
  };
  removeComment = (comment_id) => {
    console.log(comment_id);

    api
      .deleteComment(comment_id)
      .then(() => {
        this.setState(({ comments }) => {
          const filteredComments = comments.filter(
            (comment) => comment.comment_id !== comment_id
          );
          return { comments: filteredComments, err: false };
        });
      })
      .catch(() => {
        this.setState({ err: true });
      });
  };
}

export default Comments;
