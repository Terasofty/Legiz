import http from "@/core/http-common";
import header from "@/auth/service/auth-header";

class LegalAdviceService {
  endPoint = "legaladvices";

  getAll() {
    return http.get(this.endPoint, { headers: header() });
  }
  create(legalAdvice) {
    console.log(legalAdvice);
    return http.post(
      this.endPoint,
      {
        title: legalAdvice.title,
        statusLawService: legalAdvice.statusLawService,
        description: legalAdvice.description,
        lawyerId: legalAdvice.lawyerId,
        customerId: legalAdvice.customerId,
        legalDocumentId: legalAdvice.legalDocumentId,
      },
      { headers: header() }
    );
  }

  update(legalAdvice) {
    console.log(legalAdvice);
    return http.put(
      `${this.endPoint}/${legalAdvice.id}`,
      {
        title: legalAdvice.title,
        statusLawService: legalAdvice.statusLawService,
        description: legalAdvice.description,
        lawyerId: legalAdvice.lawyerId,
        customerId: legalAdvice.customerId,
        legalDocumentId: legalAdvice.legalDocumentId,
        legalResponse: legalAdvice.legalResponse,
      },
      { headers: header() }
    );
  }
}

export default new LegalAdviceService();
