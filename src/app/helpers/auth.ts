import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getItem, saveItem, removeItem } from "./storage";

export function isLoggedIn() {
  return getAuthToken() !== null;
}

export function getAuthToken() {
  return getItem("jwtToken");
}

function removeAuthToken() {
  removeItem("jwtToken");
}

export function signIn(
  jwtToken: string,
  router: AppRouterInstance,
  setIsLoggedIn: (isLoggedIn: boolean) => void
) {
  saveItem("jwtToken", jwtToken);
  setIsLoggedIn(true);
  router.replace("/user-profile");
}

export function signOut(router: AppRouterInstance, setIsLoggedIn: (isLoggedIn: boolean) => void) {
  removeAuthToken();
  setIsLoggedIn(false);
  router.replace("/sign-in");
}
