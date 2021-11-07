import http from "@/core/http-common";

class TutorialsService {
  endPoint = "/lawyers";

  getAll(lawyerId) {
    return http.get(`${this.endPoint}/${lawyerId}/employments`);
  }
  // getById(id) {
  //   return http.get(`${this.endPoint}/${id}`);
  // }
  create(lawyerId, createEmploymentHistoryDto) {
    return http.post(`${this.endPoint}/${lawyerId}/employments`, createEmploymentHistoryDto);
  }
  // update(id, updateTutorialDto) {
  //   return http.put(`${this.endPoint}/${id}`, updateTutorialDto);
  // }
  delete(employmentHistoryId) {
    return http.delete(`/employments/${employmentHistoryId}`);
  }
  // findByTitle(title) {
  //   return http.get(`${this.endPoint}?title=${title}`);
  // }
}

export default new TutorialsService();
