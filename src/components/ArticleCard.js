import React from "react";
import VoteUpdater from "./VoteUpdater";

const ArticleCard = (props) => {
  const { title, body, author, votes, comment_count, article_id } = props;
  return (
    <section className='articleCard'>
      <h3>{title}</h3>
      <p> author : {author}</p>
      <p>{body}</p>
      <VoteUpdater article_id={article_id} votes={votes} />
      <p>comments : {comment_count}</p>
    </section>
  );
};

export default ArticleCard;
