import React from "react";
import VoteUpdater from "./VoteUpdater";

const CommentCard = (props) => {
  const { body, author, votes, comment_id, removeComment, username } = props;
  return (
    <section className='commentCard'>
      <p className='darkGrey'>{author}</p>
      <p>{body}</p>
      <VoteUpdater type='comment' comment_id={comment_id} votes={votes} />
      {username === author && (
        <button onClick={() => removeComment(comment_id)}>
          delete comment
        </button>
      )}
    </section>
  );
};
export default CommentCard;
