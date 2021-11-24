import http from "@/core/http-common";
import header from "@/auth/service/auth-header";

class CustomerService {
  endPoint = "customers/auth/";

  register(customer) {
    return http.post(
      this.endPoint + "sign-up",
      {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        username: customer.username,
        password: customer.password,
        phone: customer.phone,
        dni: customer.dni,
      },
      { headers: header() }
    );
  }
}

export default new CustomerService();
