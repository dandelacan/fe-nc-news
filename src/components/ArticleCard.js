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
    showFull
  } = props;

  return (
    <section className='articleCard'>
      <Link to={`/articles/${article_id}`}>
        <h3>{title}</h3>
      </Link>
      <p className='darkGrey'> author : {author}</p>
      {showFull ? <p className='articleBody'>{body}</p> :
        <Link to={`/articles/${article_id}`}>
          <p className='articleBody truncated'>{!showFull && body.length > 500 ? body.slice(0, 500) : body}</p>
          {!showFull && body.length > 400 && <div className='fadeout'></div>}
        </Link>}
      < VoteUpdater type='article' article_id={article_id} votes={votes} />
      <p className='darkGrey'>comments : {comment_count}</p>
      <Comments
        username={username}
        article_id={article_id}
        showComments={showComments}
      />
    </section>
  );
};

export default ArticleCard;
