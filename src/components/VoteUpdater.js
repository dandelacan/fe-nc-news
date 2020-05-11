import React, { Component } from "react";
import * as api from "../utils/api";

class VoteUpdater extends Component {
  state = {
    voteDifference: 0,
    err: false,
    hasVoted: false,
  };

  render() {
    const { voteDifference, err, hasVoted } = this.state;
    const { votes } = this.props;
    return (
      <div className='voteUpdater'>
        <p className='darkGrey'>votes: {votes + voteDifference}</p>
        {err && "sorry we cannot update votes at the minute"}
        <button onClick={() => this.handleVote(1)} disabled={hasVoted}>
          <span role='img' aria-label='up vote'>
            👍
          </span>
        </button>
        <button onClick={() => this.handleVote(-1)} disabled={hasVoted}>
          <span role='img' aria-label='down vote'>
            👎
          </span>
        </button>
        {hasVoted && (
          <button
            onClick={() => {
              this.handleVote(-this.state.voteDifference);
            }}
          >
            undo vote
          </button>
        )}
      </div>
    );
  }
  handleVote = (voteChange) => {
    const { article_id, type, comment_id } = this.props;

    this.setState(({ voteDifference, hasVoted }) => {
      return {
        voteDifference: voteDifference + voteChange,
        err: false,
        hasVoted: !hasVoted,
      };
    });
    api.patchVotes(article_id || comment_id, type, voteChange).catch(() => {
      this.setState((currentState) => {
        return {
          voteDifference: currentState.voteDifference - voteChange,
          err: true,
          hasVoted: false,
        };
      });
    });
  };
}

export default VoteUpdater;
