import http from "@/core/http-common";
import header from "@/auth/service/auth-header";

class UserService {
  endPoint = "users";

  getAll() {
    return http.get(this.endPoint, { headers: header() });
  }
}

export default new UserService();
