import axios from "axios";
const baseUrl = "http://localhost:3001/persons";
const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (newObject, id) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const exported = { getAll, create, remove, update };
export default exported;
