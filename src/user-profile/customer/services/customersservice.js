import http from "@/core/http-common";

class CustomerService {
  endPoint = "/customers";

  getAll() {
    return http.get(this.endPoint);
  }

  getLegalAdvicesById(id) {
    return http.get(`${this.endPoint}/${id}/legal-advices`);
  }

  getCustomCasesById(id) {
    return http.get(`${this.endPoint}/${id}/custom-cases`);
  }
}

export default new CustomerService();
