import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const getConfig = () => {
  return {
    headers: {
      Authorization: token,
    },
  };
};
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async ({ author, title, url }) => {
  const config = getConfig();
  const response = await axios.post(baseUrl, { author, title, url }, config);
  return response.data;
};

const update = async ({ author, title, url, likes, id, user }) => {
  const config = getConfig();
  const response = await axios.put(
    `${baseUrl}/${id}`,
    { author, title, url, likes, user: user.id },
    config
  );
  return response.data;
};

const deleteBlog = async (id) => {
  const config = getConfig();
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const functions = {
  getAll,
  setToken,
  create,
  update,
  deleteBlog,
};

export default functions;
