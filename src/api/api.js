export const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export function getToken() {
  return localStorage.getItem("token") || "";
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}
