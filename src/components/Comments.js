import React, { Component } from "react";
import CommentCard from "./CommentCard";
import * as api from "../utils/api";

class Comments extends Component {
  state = {
    isShown: false,
    isLoading: true,
    comments: [],
  };
  render() {
    const { comments, isShown } = this.state;
    console.log(isShown);
    if (!this.state.isShown) {
      return (
        <button onClick={() => this.toggleComments()}>show comments</button>
      );
    }
    return (
      <div>
        <button onClick={() => this.toggleComments()}>hide comments</button>
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} {...comment} />;
        })}
      </div>
    );
  }
  componentDidMount() {
    this.fetchComments();
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
}

export default Comments;
