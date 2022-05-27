export default function authHeader() {
  let token = localStorage.getItem("token");
  if (token) {
    //console.log(`Bearer ${token}`);
    return { Authorization: "Bearer " + token };
  } else {
    //console.log("No token available");
    return {};
  }
}
