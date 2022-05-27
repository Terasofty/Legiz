export default function authHeader() {
  let token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    //console.log(`Bearer ${token}`);
    return { ...headers, Authorization: "Bearer " + token };
  } else {
    //console.log("No token available");
    return { ...headers };
  }
}
