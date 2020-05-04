import axios from "axios";

export const getTopics = () => {
  return axios
    .get("https://djh-nc-news.herokuapp.com/api/topics")
    .then(({ data: { topics } }) => {
      return topics;
    });
};

export const getArticles = (sort_by, topic) => {
  console.log("sortBy", sort_by);
  return axios
    .get("https://djh-nc-news.herokuapp.com/api/articles", {
      params: { topic, sort_by },
    })
    .then(({ data: { articles } }) => {
      console.log("api", articles);
      return articles;
    })
    .catch((err) => console.dir(err));
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
    console.log("hi comment", id);
    return axios.patch(`https://djh-nc-news.herokuapp.com/api/comments/${id}`, {
      inc_votes: voteChange,
    });
  }
  console.log(id);
  return axios.patch(`https://djh-nc-news.herokuapp.com/api/articles/${id}`, {
    inc_votes: voteChange,
  });
};
