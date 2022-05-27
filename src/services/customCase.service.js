import http from "@/core/http-common";
import header from "@/auth/service/auth-header";
const endPoint = "custom_cases";
const getAll = async () => {
  return await http.get(endPoint, { headers: header() });
};

export { getAll }