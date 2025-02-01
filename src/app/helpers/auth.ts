import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getItem, removeItem } from "./storage";

export function isLoggedIn() {
  return getAuthToken() !== null;
}

export function getAuthToken() {
  return getItem("jwtToken");
}

function removeAuthToken() {
  removeItem("jwtToken");
}

export function signOut(router: AppRouterInstance) {
  removeAuthToken();
  router.replace("/sign-in");
}
