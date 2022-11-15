export default function authHeader() {
  const accessToken = localStorage.getItem("userToken");

  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  } else {
    return {};
  }
}
