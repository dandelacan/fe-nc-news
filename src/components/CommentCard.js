import React, { Component } from "react";
import VoteUpdater from "./VoteUpdater";

class CommentCard extends Component {
  state = { autErr: false };
  render() {
    const {
      body,
      author,
      votes,
      comment_id,
      removeComment,
      username,
    } = this.props;
    return (
      <section className='articleCard'>
        <p> {author}</p>
        <p>{body}</p>
        <VoteUpdater type='comment' comment_id={comment_id} votes={votes} />
        {username === author && (
          <button onClick={() => removeComment(comment_id)}>
            delete comment
          </button>
        )}
      </section>
    );
  }
}

export default CommentCard;
