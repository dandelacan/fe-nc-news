import axios from "axios";

const baseURL = "https://djh-nc-news.herokuapp.com/api/";

export const getTopics = () => {
  return axios.get(`${baseURL}topics`).then(({ data: { topics } }) => {
    return topics;
  });
};

export const getArticles = (sort_by, topic, order, page) => {
  return axios
    .get(`${baseURL}articles`, {
      params: { topic, sort_by, order, page },
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getComments = (article_id) => {
  return axios
    .get(`${baseURL}articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const getSingleArticle = (article_id) => {
  return axios
    .get(`${baseURL}articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const patchVotes = (id, type, voteChange) => {
  if (type === "comment") {
    return axios.patch(`${baseURL}comments/${id}`, {
      inc_votes: voteChange,
    });
  }
  return axios.patch(`${baseURL}articles/${id}`, {
    inc_votes: voteChange,
  });
};

export const postComment = (commentBody, article_id, username) => {
  return axios
    .post(`${baseURL}articles/${article_id}/comments`, {
      username,
      body: commentBody,
    })
    .then(({ data: { comment } }) => {
      return comment;
    });
};
export const deleteComment = (comment_id) => {
  return axios.delete(`${baseURL}comments/${comment_id}`);
};
