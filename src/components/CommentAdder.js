import React, { Component } from "react";

class CommentAdder extends Component {
  state = { body: "" };
  render() {
    const { body } = this.state;
    console.log(this.props);
    return <form>adder</form>;
  }
}

export default CommentAdder;
