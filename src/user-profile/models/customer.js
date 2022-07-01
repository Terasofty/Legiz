import User from "./user";
export default class Customer extends User {
  constructor(firstName, lastName, email, username, password, phone, dni, roles) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
    this.phone = phone;
    this.dni = dni;
    this.roles = roles;
  }
}
