import http from "@/core/http-common";

class LawyerService {
  endPoint = "/lawyers";

  getAll() {
    return http.get(this.endPoint);
  }
}

export default new LawyerService();
