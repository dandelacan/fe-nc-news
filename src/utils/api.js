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
