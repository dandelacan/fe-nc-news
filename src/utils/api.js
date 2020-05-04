import axios from "axios";

export const getTopics = () => {
  return axios
    .get("https://djh-nc-news.herokuapp.com/api/topics")
    .then(({ data: { topics } }) => {
      return topics;
    });
};

export const getArticles = (topic) => {
  console.log("topic", topic);
  return axios
    .get("https://djh-nc-news.herokuapp.com/api/articles", {
      params: { topic },
    })
    .then(({ data: { articles } }) => {
      console.log("api", articles);
      return articles;
    });
};

export const patchVotes = (article_id, voteChange) => {
  return axios.patch(
    `https://djh-nc-news.herokuapp.com/api/articles/${article_id}`,
    { inc_votes: voteChange }
  );
};
