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
        <Link to='/'>
          <h3>Home</h3>
        </Link>
        <p>Topics</p>

        {topics.map(({ slug }) => {
          return (
            <Link key={slug} to={`/topics/${slug}`}>
              <h3>{slug}</h3>
            </Link>
          );
        })}
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
