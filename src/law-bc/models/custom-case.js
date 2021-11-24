export default class CustomCase {
  constructor(title, startAt, finishAt, typeMeet, statusLawService, lawyerId, customerId, legalDocumentId) {
    this.title = title;
    this.startAt = startAt;
    this.finishAt = finishAt;
    this.typeMeet = typeMeet;
    this.statusLawService = statusLawService;
    this.lawyerId = lawyerId;
    this.customerId = customerId;
    this.legalDocumentId = legalDocumentId;
  }
}
