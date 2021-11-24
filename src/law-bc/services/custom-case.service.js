import http from "@/core/http-common";
import header from "@/auth/service/auth-header";

class CustomCaseService {
  endPoint = "customlegalcases";

  getAll() {
    return http.get(this.endPoint, { headers: header() });
  }
  create(customCase) {
    console.log(customCase);
    return http.post(
      this.endPoint,
      {
        title: customCase.title,
        startAt: customCase.startAt,
        finishAt: customCase.finishAt,
        typeMeet: customCase.typeMeet,
        statusLawService: customCase.statusLawService,
        lawyerId: customCase.lawyerId,
        customerId: customCase.customerId,
        legalDocumentId: customCase.legalDocumentId,
      },
      { headers: header() }
    );
  }
}

export default new CustomCaseService();
