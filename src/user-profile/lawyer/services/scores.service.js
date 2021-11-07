import http from "@/core/http-common";

class ScoreService {
  endPoint = "/lawyers";

  getAll(lawyerId) {
    return http.get(`${this.endPoint}/${lawyerId}/scores`);
  }
}

export default new ScoreService();
