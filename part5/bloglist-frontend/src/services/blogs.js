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

const update = async ({ author, title, url, likes, id, user }) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(
    `${baseUrl}/${id}`,
    { author, title, url, likes, user: user.id },
    config
  );
  return response.data;
};

const functions = {
  getAll,
  setToken,
  create,
  update,
};
export default functions;
