import http from "@/core/http-common";
import header from "@/auth/service/auth-header";

class LawyerService {
  endPoint = "lawyers";

  getAll() {
    return http.get(this.endPoint, { headers: header() });
  }
  register(lawyer) {
    console.log(lawyer.username);
    return http.post(
      `${this.endPoint}/auth/` + "sign-up",
      {
        firstName: lawyer.firstName,
        lastName: lawyer.lastName,
        email: lawyer.email,
        username: lawyer.username,
        password: lawyer.password,
        district: lawyer.district,
        university: lawyer.university,
        specialization: lawyer.specialization,
        priceLegalAdvice: lawyer.priceLegalAdvice,
        priceCustomContract: lawyer.priceCustomContract,
        subscriptionId: lawyer.subscriptionId,
      },
      { headers: header() }
    );
  }
}

export default new LawyerService();
