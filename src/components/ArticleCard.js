import React from "react";

const ArticleCard = (props) => {
  const { title, body, author, votes, comment_count } = props;
  return (
    <section className='articleCard'>
      <h3>{title}</h3>
      <p> author : {author}</p>
      <p>{body}</p>
      <p>
        votes: {votes} comments : {comment_count}
      </p>
    </section>
  );
};

export default ArticleCard;
