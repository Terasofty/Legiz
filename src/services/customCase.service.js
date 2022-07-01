import http from "@/core/http-common";
import header from "@/auth/service/auth-header";
const endPoint = "cases";

const getAll = async () => {
  return await http.get(endPoint, { headers: header() });
};

const get = async (id) => {
  return await http.get(`${endPoint}/${id}`, { headers: header() });
}

const create = async (payload) => {
  payload.type = "custom";
  const user = JSON.parse(localStorage.getItem("user"));
  payload.clientUsername = user.username;
  return await http.post(endPoint, payload, { headers: header() });
};

export { getAll, get, create };
