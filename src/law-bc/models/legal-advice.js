export default class LegalAdvice {
  constructor(title, statusLawService, description, lawyerId, customerId, legalDocumentId) {
    this.title = title;
    this.statusLawService = statusLawService;
    this.description = description;
    this.lawyerId = lawyerId;
    this.customerId = customerId;
    this.legalDocumentId = legalDocumentId;
  }
}
