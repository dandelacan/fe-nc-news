import React, { Component } from "react";
import * as api from "../utils/api";

class VoteUpdater extends Component {
  state = { voteDifference: 0 };
  render() {
    return (
      <div>
        <p>votes: {this.props.votes + this.state.voteDifference}</p>
        <button onClick={() => this.handleVote(1)}>
          <span role='img' aria-label='up vote'>
            👍
          </span>
        </button>
        <button onClick={() => this.handleVote(-1)}>
          <span role='img' aria-label='down vote'>
            👎
          </span>
        </button>
      </div>
    );
  }
  handleVote = (voteChange) => {
    const { article_id } = this.props;

    this.setState((currentState) => {
      return { voteDifference: currentState.voteDifference + voteChange };
    });
    api.patchVotes(article_id, voteChange).catch(() => {
      this.setState((currentState) => {
        return { voteDifference: currentState.voteDifference - voteChange };
      });
    });
  };
}

export default VoteUpdater;
