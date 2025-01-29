import { getItem } from "./storage";

export function isLoggedIn() {
  return getAuthToken() !== null;
}

export function getAuthToken() {
  return getItem("jwtToken");
}
