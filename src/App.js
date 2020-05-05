import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Title from "./components/Title";
import LogIn from "./components/LogIn";
import NavBar from "./components/NavBar";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import ErrorDisplayer from "./components/ErrorDisplayer";

class App extends Component {
  state = {
    user: {
      username: "cooljmessy",
      name: "Peter Messy",
      avatar_url:
        "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png",
    },
  };
  render() {
    const { user } = this.state;
    return (
      <div className='App'>
        <header className='App-header'>
          <Title />
          <LogIn user={user}></LogIn>
        </header>
        <main>
          <NavBar />
          <Router>
            <Articles username={user.username} path='/articles' />
            <Articles username={user.username} path='topics/:topic' />
            <SingleArticle
              username={user.username}
              path='/articles/:article_id'
            />
            <ErrorDisplayer default />
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
