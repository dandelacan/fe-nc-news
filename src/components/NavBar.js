import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";

class NavBar extends Component {
  state = {
    topics: [],
  };
  render() {
    const { topics } = this.state;
    return (
      <nav>
        <Link to='/articles'>Home</Link>
        <p>Topics</p>
        <ul>
          {topics.map(({ slug }) => {
            return (
              <li key={slug}>
                <Link to={`/topics/${slug}`}>{slug}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
  componentDidMount() {
    this.fetchTopics();
  }
  fetchTopics = () => [
    api.getTopics().then((topics) => {
      this.setState({ topics });
    }),
  ];
}

export default NavBar;
