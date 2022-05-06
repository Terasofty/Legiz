import http from "@/core/http-common";
import header from "@/auth/service/auth-header";

class AuthService {
  endPoint = "login";

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
        console.log(response);
        if (response.data.token) {
          console.log("user:" + response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
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
