import axios from "axios";
const baseUrl = "/api/blogs";
let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async ({ author, title, url }) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, { author, title, url }, config);
  return response.data;
};

export default { getAll, setToken, create };
