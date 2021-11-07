import http from "@/core/http-common";

class LegalAdvicesService {
  endPoint = "/legal-advices";

  getAll() {
    return http.get(this.endPoint);
  }
  getById(id) {
    return http.get(`${this.endPoint}/${id}`);
  }
  getByCustomerId(customerId) {
    return http.get(`${this.endPoint}/customers/${customerId}`);
  }
  create(legalAdviceDto) {
    return http.post(this.endPoint, legalAdviceDto);
  }
  update(id, updateLegalAdviceDto) {
    return http.put(`${this.endPoint}/${id}`, updateLegalAdviceDto);
  }
  delete(id) {
    return http.delete(`${this.endPoint}/${id}`);
  }
  findByTitle(title) {
    return http.get(`${this.endPoint}?title=${title}`);
  }
}

export default new LegalAdvicesService();
