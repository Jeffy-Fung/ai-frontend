import { get } from "@/app/helpers/api";

export function getProfile() {
  return get(`api/users/67946d26cef29a6ccd1397bb`, null);
}
