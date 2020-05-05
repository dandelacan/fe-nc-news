import axios from "axios";

export const getTopics = () => {
  return axios
    .get("https://djh-nc-news.herokuapp.com/api/topics")
    .then(({ data: { topics } }) => {
      return topics;
    });
};

export const getArticles = (sort_by, topic) => {
  return axios
    .get("https://djh-nc-news.herokuapp.com/api/articles", {
      params: { topic, sort_by },
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getComments = (article_id) => {
  return axios
    .get(
      `https://djh-nc-news.herokuapp.com/api/articles/${article_id}/comments`
    )
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const getSingleArticle = (article_id) => {
  return axios
    .get(`https://djh-nc-news.herokuapp.com/api/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const patchVotes = (id, type, voteChange) => {
  if (type === "comment") {
    return axios.patch(`https://djh-nc-news.herokuapp.com/api/comments/${id}`, {
      inc_votes: voteChange,
    });
  }
  return axios.patch(`https://djh-nc-news.herokuapp.com/api/articles/${id}`, {
    inc_votes: voteChange,
  });
};

export const postComment = (commentBody, article_id, username) => {
  return axios
    .post(
      `https://djh-nc-news.herokuapp.com/api/articles/${article_id}/comments`,
      { username, body: commentBody }
    )
    .then(({ data: { comment } }) => {
      return comment;
    });
};
export const deleteComment = (comment_id) => {
  return axios.delete(
    `https://djh-nc-news.heokuapp.com/api/comments/${comment_id}`
  );
};
