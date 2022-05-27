import http from "@/core/http-common";
import header from "@/auth/service/auth-header";

class AuthService {
  endPoint = "login";
  access_token = "";

  login(user) {
    return http
      .post(
        this.endPoint,
        {
          username: user.username,
          password: user.password,
        },
        { headers: header() }
      )
      .then((response) => {
        const token = response.data.access_token;
        if (token) {
          localStorage.setItem("token", token);
        }
        return this.getUser();
      });
  }
  getUser() {
    return http.get("users/profile", { headers: header() }).then(({ data }) => {
      delete data["password"];
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    });
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  register(user) {
    return http.post(
      this.endPoint + "sign-up",
      {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: user.password,
      },
      { headers: header() }
    );
  }
}
export default new AuthService();
