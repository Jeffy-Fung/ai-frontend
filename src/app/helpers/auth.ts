import { getItem } from "./storage";

export function isLoggedIn() {
  return getItem("jwtToken") !== null;
}
