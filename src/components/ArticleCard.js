import React from "react";
import VoteUpdater from "./VoteUpdater";
import { Link } from "@reach/router";
import Comments from "./Comments";

const ArticleCard = (props) => {
  const {
    title,
    body,
    author,
    votes,
    comment_count,
    article_id,
    showComments,
    username,
  } = props;

  console.log(props);
  return (
    <section className='articleCard'>
      <Link to={`/articles/${article_id}`}>
        <h3>{title}</h3>
      </Link>
      <p> author : {author}</p>
      <p>{body}</p>
      <VoteUpdater type='article' article_id={article_id} votes={votes} />
      <p>comments : {comment_count}</p>
      <Comments
        username={username}
        article_id={article_id}
        showComments={showComments}
      />
    </section>
  );
};

export default ArticleCard;
